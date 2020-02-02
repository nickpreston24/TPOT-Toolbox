import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { EditorState, SelectionState, Modifier } from 'draft-js';
import Icon from 'mdi-material-ui/LinkVariant'
import { compose } from 'recompose';
import DraftUtils from 'draftjs-utils'
import { inject, observer } from 'mobx-react';
import classNames from 'classnames'
import PropTypes from 'prop-types';
import { findEntityRangesWithRegex } from '../utils/strategies';

const styles = theme => ({
    root: {
        overflow: 'hidden',
        background: '#e9f4ff',
        borderRadius: 6,
        paddingRight: 6,
        color: '#5e93c5',
        '& span, svg': {
            background: '#e9f4ff',
            color: '#5e93c5',
        },
        '&:hover *, &:focus *': {
            color: '#7eadda',
            cursor: 'pointer',
        },
    },
    editing: {
        background: '#d0e1f3',
        '& span, svg': {
            background: '#d0e1f3',
            color: '#7eadda',
        }
    },
    warning: {
        background: '#fdf1d0',
        '& span, svg': {
            background: '#fdf1d0',
            color: '#c5995e',
        }
    },
    span: {
        borderBottom: '1px dotted #5e93c5',
        textIndent: 24,
    },
    icon: {
        fontSize: 20,
        transform: 'translateY(4px)',
        marginRight: 4,
        marginLeft: 2,
    }
});

class LinkSpan extends Component {

    componentDidMount() {
        if (this.props.callbacks) {
            this.createEntityFromDecorator()
        }
    }

    componentWillUnmount() {
        if (this.callbacks) {
            // : Needed?
            this.props.callbacks.onChange = undefined;
        }
    }

    /*
     
       .oooooo.                                    .             
      d8P'  `Y8b                                 .o8             
     888          oooo d8b  .ooooo.   .oooo.   .o888oo  .ooooo.  
     888          `888""8P d88' `88b `P  )88b    888   d88' `88b 
     888           888     888ooo888  .oP"888    888   888ooo888 
     `88b    ooo   888     888    .o d8(  888    888 . 888    .o 
      `Y8bood8P'  d888b    `Y8bod8P' `Y888""8o   "888" `Y8bod8P' 
                                                                 
                                                                 
                                                                 
     
    */

    createEntityFromDecorator = () => {

        const { seteditorstate, offsetkey, regex, strategy, decoratedtext } = this.props
        const { currentEditorState } = this.props.store
        // console.group('CREATE')
        // console.log(`%c[${decoratedtext}]`, `color: #68b684; background: #02501e;`)

        // : get currentEditorState from store that was initialized with first editorState
        let editorState = currentEditorState
        let contentState = editorState.getCurrentContent()
        let selection = editorState.getSelection()
        let focusKey = selection.getFocusKey()

        // : Get Block and Key from Decorator Regex, Get Content State
        let keyTrim = new RegExp(/([a-zA-z\d]+)/g)
        let blockKey = keyTrim.exec(offsetkey)[0]
        let block = contentState.getBlockForKey(blockKey)
        if (!block) {
            block = contentState.getBlockForKey(focusKey)
        }

        // : Component Mounted by Decorator
        if (regex) {

            // : In Each Block, Check for Multiple Matches to Regex Pattern
            findEntityRangesWithRegex(regex, contentState.getBlockForKey(blockKey)).map(match => {

                // : If there is a Regex Match 
                if (decoratedtext === match[0]) {

                    // : Get Range of Full Match
                    let replaceSelection = new SelectionState({ anchorKey: blockKey, anchorOffset: match.index, focusKey: blockKey, focusOffset: match[0].length + match.index, })

                    // : Replace Selection with Title or Floating URL
                    contentState = Modifier.replaceText(contentState, replaceSelection, strategy === 'generic' ? decoratedtext : strategy === 'shortcode' ? match[2] : match[1])

                    // : Force Replaced Text into editorState History
                    editorState = EditorState.push(editorState, contentState, 'insert-characters');

                    // : Get Range of Full Match or Title Text
                    let start = match.index
                    let end = strategy === 'generic' ? decoratedtext.length + start : strategy === 'shortcode' ? match[2].length + start : match[1].length + start

                    // : Make New Selection for Entity
                    let regexSelection = new SelectionState({ anchorKey: blockKey, anchorOffset: start, focusKey: blockKey, focusOffset: end })

                    // : Create Entity in Content State
                    contentState = contentState.createEntity('LINK', 'MUTABLE', { url: strategy === 'generic' ? decoratedtext : strategy === 'shortcode' ? match[1] : match[2] });
                    let lastEntityKey = contentState.getLastCreatedEntityKey();

                    // : Modify contentState with Entity Data
                    contentState = Modifier.applyEntity(contentState, regexSelection, lastEntityKey);

                    // : Apply Entity to editorState
                    editorState = EditorState.push(editorState, contentState, 'apply-entity');

                    // : Create Collapsed Selection at Entity End
                    let collapsedSelection = new SelectionState({ anchorKey: blockKey, anchorOffset: end, focusKey: blockKey, focusOffset: end, })

                    // : Apply Selectlion to editorState
                    editorState = EditorState.forceSelection(editorState, collapsedSelection)

                } else {
                    return match
                }

            })

        } else {
            return false
        }

        // : set editorState that onChange can see
        // console.groupEnd()
        seteditorstate(editorState)

    }

    /*
     
     ooooo     ooo                  .o8                .             
     `888'     `8'                 "888              .o8             
      888       8  oo.ooooo.   .oooo888   .oooo.   .o888oo  .ooooo.  
      888       8   888' `88b d88' `888  `P  )88b    888   d88' `88b 
      888       8   888   888 888   888   .oP"888    888   888ooo888 
      `88.    .8'   888   888 888   888  d8(  888    888 . 888    .o 
        `YbodP'     888bod8P' `Y8bod88P" `Y888""8o   "888" `Y8bod8P' 
                    888                                              
                   o888o                                             
                                                                     
     
    */

    onEditorStateChange = (editorState) => {

        const { setItem } = this.props.store

        // : Use editorState from OnChange
        let contentState = editorState.getCurrentContent()
        let selection = editorState.getSelection()
        let focusKey = selection.getFocusKey()
        let focusOffset = selection.getFocusOffset()
        let anchorOffset = selection.getAnchorOffset()

        // : Bump and Shift Selection to See if we are in an Entity
        const block = contentState.getBlockForKey(focusKey)
        let entityKeyAtSelectionEnd = block.getEntityAt(focusOffset)
        if (!entityKeyAtSelectionEnd) {
            entityKeyAtSelectionEnd = block.getEntityAt(focusOffset - 1)
        }
        if (!entityKeyAtSelectionEnd) {
            entityKeyAtSelectionEnd = block.getEntityAt(focusOffset - 2)
        }
        let entityKeyAtSelectionStart = block.getEntityAt(anchorOffset)

        // : User's Selection is inside an Entity Now!
        if (entityKeyAtSelectionStart || entityKeyAtSelectionEnd) {

            // console.log('Inside Entity', true)
            // : Get and Check and Set Current Key and Entity
            let currentKey = !!entityKeyAtSelectionStart ? entityKeyAtSelectionStart : entityKeyAtSelectionEnd
            setItem('currentEntityKey', currentKey)
            // console.log(currentKey)

            // : Get Entity Text and Ranges
            let blockText = block.getText()
            let { start, end } = (() => {
                let _ = {}
                block.findEntityRanges(
                    (value) => { return currentKey === value.getEntity() },
                    (start, end) => { _.start = start; _.end = end },
                )
                return _
            })()

            // : Capture string of entity range with characters before and after and add to entity
            let captureStart = start - 1
            let captureEnd = end > blockText.length ? blockText.length : end

            // : Force selection into entity range
            let insertPoint = focusOffset > captureStart ? focusOffset : focusOffset < captureStart ? focusOffset : focusOffset > captureEnd ? focusOffset : focusOffset < captureEnd ? focusOffset : anchorOffset

            // console.log(blockText)
            // console.log(blockText.slice(start, end))
            // console.log(blockText.slice(captureStart, captureEnd))
            // console.log(blockText.charAt(captureStart), /[^\s\r\n]/g.test(blockText.charAt(captureStart)))
            // console.log(blockText.charAt(captureEnd), /[^\s\r\n]/g.test(blockText.charAt(captureEnd)))

            // : Are Adjacent Characters Valid?
            let validChar = new RegExp(/[^\s\r\n]/g)
            let startValid = validChar.test(blockText.charAt(captureStart))
            let endValid = validChar.test(blockText.charAt(captureEnd))

            if (startValid || endValid) {

                // : Store Existing Entity Data
                let entityRanges = DraftUtils.getEntityRange(editorState, currentKey)
                let entityInstance = contentState.getEntity(currentKey)
                let entityData = entityInstance.getData()
                let entityStart = entityRanges.start
                let entityEnd = entityRanges.end

                // : Select Existing Entity
                let existingSelection = new SelectionState({
                    anchorKey: focusKey, anchorOffset: entityStart,
                    focusKey: focusKey, focusOffset: entityEnd,
                })

                // : Destroy Existing Entity
                contentState = Modifier.applyEntity(contentState, existingSelection, null);

                // : Determine Adjacent Selection
                let absorbSelection = new SelectionState({
                    anchorKey: focusKey, anchorOffset: startValid ? captureStart : start,
                    focusKey: focusKey, focusOffset: startValid ? end : captureEnd + 1,
                })

                // : Determine Adjacent Text
                // let absorbText = startValid ? blockText.slice(captureStart, end) : blockText.slice(start, captureEnd + 1)

                // : Create New Entity Replacement
                contentState = contentState.createEntity('LINK', 'MUTABLE', { ...entityData });

                // : Re-Update the Store's Current Entity Key
                let lastEntityKey = contentState.getLastCreatedEntityKey();
                setItem('currentEntityKey', lastEntityKey)

                // : Create New Entity in Content State
                contentState = Modifier.applyEntity(contentState, absorbSelection, lastEntityKey);

                // : Apply Entity to editorState
                editorState = EditorState.push(editorState, contentState, 'apply-entity');

            }

            // : Create Collapsed Selection at insertPoint
            const insertSelection = new SelectionState({
                anchorKey: focusKey, anchorOffset: insertPoint,
                focusKey: focusKey, focusOffset: insertPoint,
            });

            // : Apply Selection to prevent breaking Entity title and URL
            editorState = EditorState.forceSelection(editorState, insertSelection);

        }

        // : Return editorState to onChange (will update both currentEditorState and editorState)
        // console.groupEnd()
        return editorState
    }

    /*
     
     ooooooooo.                               .o8                     
     `888   `Y88.                            "888                     
      888   .d88'  .ooooo.  ooo. .oo.    .oooo888   .ooooo.  oooo d8b 
      888ooo88P'  d88' `88b `888P"Y88b  d88' `888  d88' `88b `888""8P 
      888`88b.    888ooo888  888   888  888   888  888ooo888  888     
      888  `88b.  888    .o  888   888  888   888  888    .o  888     
     o888o  o888o `Y8bod8P' o888o o888o `Y8bod88P" `Y8bod8P' d888b    
                                                                      
                                                                      
                                                                      
     
    */

    render() {

        const { geteditorstate, children, classes, entitykey, offsetkey } = this.props
        const { currentEntityKey } = this.props.store
        // console.group('RENDER')
        // console.warn(this.props.children[0].props.text)

        // : Any change here will go to next render cycle. Focus on
        // : evaluating render conditions based upon current state.
        let editing = false
        let warning = false
        if (!entitykey) {

            // : Component is Rendered, but there is no Entity (ex: un-doing a decorated added entry)
            // TODO - Prevent only initially converted decorator entities from being undone, but not later ones
            warning = true
            // ! this.createEntityFromDecorator()
        } else {

            // console.log(entitykey)
            // console.log('Rendered Content: ', convertToRaw(geteditorstate().getCurrentContent()))
            // console.log('Rendered Content: ', convertToRaw(currentEditorState.getCurrentContent()))

            // : This Entity Instance is Currently Editable
            if (currentEntityKey === entitykey) {

                // : Get Entity Text and Ranges
                let editorState = geteditorstate()
                let contentState = editorState.getCurrentContent()

                // : Get Entity Text and Ranges
                let blockKey = /([a-zA-z\d]+)/g.exec(offsetkey)[0]
                let block = contentState.getBlockForKey(blockKey)
                let blockText = block.getText()
                let { start, end } = (() => {
                    let _ = {}
                    block.findEntityRanges(
                        (value) => { return entitykey === value.getEntity() },
                        (start, end) => { _.start = start; _.end = end },
                    )
                    return _
                })()

                // : Capture string of entity range with characters before and after and add to entity
                let captureStart = start === 0 ? 0 : start - 1
                let captureEnd = end > blockText.length ? blockText.length : end + 1
                // let captureText = blockText.slice(captureStart, captureEnd)

                // : Shift and Bump Selection around Ranges    
                let selection = editorState.getSelection()
                // let anchorOffset = selection.getAnchorOffset()
                let focusKey = selection.getFocusKey()
                let focusOffset = selection.getFocusOffset()

                // : Set Final Editing State for UI Feedback
                editing = captureStart < focusOffset && focusOffset < captureEnd && focusKey === blockKey

            }
        }

        // : Other Rendering Prep Operations, if any

        // : Render based upon the current editorState
        // console.groupEnd()

        return (
            <span className={classNames(classes.root, editing && classes.editing, warning && classes.warning)} >
                <Fragment>
                    <Icon className={classes.icon} />
                    <span className={classes.span} children={children} />
                </Fragment>
            </span>
        )
    }
};

LinkSpan.propTypes = {
    store: PropTypes.object.isRequired,
    strategy: PropTypes.string.isRequired,
};

export default compose(
    inject('store'),
    withStyles(styles),
    observer
)(LinkSpan)