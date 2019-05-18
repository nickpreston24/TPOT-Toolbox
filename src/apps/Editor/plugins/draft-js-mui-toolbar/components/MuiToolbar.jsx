import PropTypes from 'prop-types';
import React, { Component, Fragment } from "react";
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { getVisibleSelectionRect } from 'draft-js';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import BlockToolbar from './BlockToolbar';
import InlineToolbar from './InlineToolbar';
import { toJS } from 'mobx';

const styles = theme => ({
    root: {
        position: "absolute",
        // border: '2px solid magenta',
        // height: 2,
        // width: 2,
        // overflow: 'visible',
    },
});

class MuiToolbar extends Component {

    componentWillMount() {
        this.props.store.subscribeToItem('selection', this.onSelectionChanged); // Listen to parent plugin's onChange event which updates 'selection' in the store
    }

    componentWillUnmount() {
        this.props.store.unsubscribeFromItem('selection', this.onSelectionChanged); // Unsubscribe from parent plugin's store and cease tracking selection changes
    }

    onSelectionChanged = () => {
        setTimeout(() => {
            const { store } = this.props;
            if (!store.inlineRef) return;
            if (!store.blockRef) return;
            const editorRef = store.getItem('getEditorRef')();
            if (!editorRef) return;
            // this keeps backwards-compatibility with react 15
            let editorRoot = editorRef.refs && editorRef.refs.editor
                ? editorRef.refs.editor : editorRef.editor;
            while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
                editorRoot = editorRoot.parentNode;
            }
            store.setStyleProp('editorRoot', editorRoot)
            const editorState = store.getItem('getEditorState')();
            const selection = editorState.getSelection();
            const currentContent = editorState.getCurrentContent();
            const editorRootRect = editorRoot.getBoundingClientRect(); //
            const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
            const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
            const currentBlockNode = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0]; //
            const selectionRect = getVisibleSelectionRect(window); //
            store.setStyleProp('editorRootRect', editorRootRect)
            store.setStyleProp('currentBlockNode', currentBlockNode)
            store.setStyleProp('selectionRect', selectionRect)
            if (!selectionRect) return;
            if (!currentBlockNode) return;
            // const inlineVisible = (!selection.isCollapsed() && selection.getHasFocus());
            const inlineVisible = (!selection.isCollapsed());
            const blockVisible = (selection.isCollapsed());
            store.setStyleProp('blockVisible', blockVisible)
            store.setStyleProp('inlineVisible', inlineVisible)
            // store.setStyleProp('inlineVisible', true)
        }, 200); // Necessary delay between inline and block toolbar switching for accurate selection and rendering
    };

    render() {
        const { classes, store } = this.props;

        const childProps = {
            getEditorState: store.getItem('getEditorState'),
            setEditorState: store.getItem('setEditorState'),
            getEditorRef: store.getItem('getEditorRef'),
            getEditorProps: store.getItem('getEditorProps'),
            customStylePrefix: store.getItem('customStylePrefix'),
            customStyleFunctions: store.getItem('customStyleFunctions'),
        };

        return (
            <Fragment>
                <div id={"MUI Inline Toolbar"} className={classes.root} style={toJS(store.inlineOrigin)} ref={(element) => { this.props.store.setStyleProp('inlineRef', element) }} >
                    <InlineToolbar childProps={childProps} />
                </div>
                <div id={"MUI Block Toolbar"} className={classes.root} style={toJS(store.blockOrigin)} ref={(element) => { this.props.store.setStyleProp('blockRef', element) }}>
                    <BlockToolbar childProps={childProps} />
                </div>
            </Fragment>
        )
    }

}

MuiToolbar.propTypes = {
    store: PropTypes.object.isRequired,
};

export default compose(
    inject('store'),
    withStyles(styles),
    observer
)(MuiToolbar)

