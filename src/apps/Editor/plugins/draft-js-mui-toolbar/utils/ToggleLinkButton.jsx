import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { EditorState, RichUtils } from 'draft-js';
import React, { Component } from 'react';
// const smalltalk = require('smalltalk')

const styles = theme => ({
    root: {
        color: theme.palette.secondary.textDark,
        minWidth: 40,
        maxWidth: 40,
        minHeight: 40,
        maxHeight: 40,
    },
    active: {
        color: theme.palette.accent
    }
});

class ToggleLinkButton extends Component {

    createLink = (event) => {
        event.preventDefault();

        this.props.getEditorRef().focus()
        let editorState = this.props.getEditorState()
        let contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url: 'www.thepathoftruth.com/new.htm' },
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.props.setEditorState(
            RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
        );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
    styleIsActive = () => RichUtils.getCurrentBlockType(this.props.getEditorState && this.props.getEditorState()) === this.props.blockType

    render() {
        const { classes, name } = this.props;
        // console.log(convertToRaw(this.props.getEditorState().getCurrentContent()))
        return (
            <div id={name} onMouseDown={this.preventBubblingUp} >
                <Button
                    ref={(element) => { this.button = element; }}
                    className={classNames(classes.root, this.styleIsActive() && classes.active)}
                    children={this.props.children}
                    onClick={this.createLink}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ToggleLinkButton);