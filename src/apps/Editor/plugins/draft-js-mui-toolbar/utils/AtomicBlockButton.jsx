import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import { AtomicBlockUtils } from 'draft-js';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames'

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

class AtomicBlockButton extends Component {

    toggleStyle = (event) => {
        event.preventDefault();

        const editorState = this.props.getEditorState()
        const newContentState = editorState.getCurrentContent().createEntity('page-break', 'MUTABLE', { props: { color: "red" } });
        const entityKey = newContentState.getLastCreatedEntityKey();
        this.props.setEditorState(
            AtomicBlockUtils.insertAtomicBlock(
                editorState,
                entityKey,
                ' '
            )
        )
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
    styleIsActive = () => RichUtils.getCurrentBlockType(this.props.getEditorState && this.props.getEditorState()) === this.props.blockType

    render() {
        const { classes, name } = this.props;
        return (
            <div id={name} onMouseDown={this.preventBubblingUp} >
                <Button
                    className={classNames(classes.root, this.styleIsActive() && classes.active)}
                    children={this.props.children}
                    onClick={this.toggleStyle}
                />
            </div>
        );
    }
}

export default withStyles(styles)(AtomicBlockButton);