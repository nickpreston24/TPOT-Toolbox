import React, { Component } from 'react';
import DraftUtils from 'draftjs-utils'
import { withStyles } from '@material-ui/core/styles';
import ButtonPlus from './ButtonPlus'
import classNames from 'classnames';

const styles = theme => ({
    root: {
        color: theme.palette.secondary.textDark,
        minWidth: 40,
        maxWidth: 40,
        minHeight: 40,
        maxHeight: 40,
    },
    active: {
        color: `${theme.palette.accent} !important`
    }
});

class BlockAlignmentButton extends Component {

    setAlign = (event) => {
        event.preventDefault();
        const currentBlock = DraftUtils.getSelectedBlock(this.props.getEditorState())
        const currentAlign = currentBlock.getData().get('textAlignment')
        if (currentAlign !== this.props.type) {
            this.props.setEditorState(DraftUtils.setBlockData(this.props.getEditorState(), { alignment: this.props.type }))
        } else {
            this.props.setEditorState(DraftUtils.setBlockData(this.props.getEditorState(), { alignment: null }))
        }
    }

    preventBubblingUp = (event) => { event.preventDefault() }

    alignIsActive = () => {
        return DraftUtils.getSelectedBlock(this.props.getEditorState()).getData().get('alignment') === this.props.type
    }

    render() {
        const { classes, name } = this.props;
        return (
            <div
                id={name}
                className={classes.root}
                onMouseDown={this.preventBubblingUp}
            >
                <ButtonPlus
                    className={classNames(classes.root, this.alignIsActive() && classes.active)}
                    children={this.props.children}
                    onClick={this.setAlign}
                    // active={this.alignIsActive()}
                />
            </div>
        );
    }
}

export default withStyles(styles)(BlockAlignmentButton);