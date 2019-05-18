import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    }
});

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.type, this.props.style);
        }
    }
    render() {
        //  FOR LATER (buttons know if they are active or not)
        // let className = 'RichEditor-styleButton';
        // if (this.props.active) {
        //         className += ' RichEditor-activeButton';
        // }
        return (
            <IconButton aria-label={this.props.label} onMouseDown={this.onToggle}>
                {this.props.icon}
            </IconButton>
        )
    }
}

StyleButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StyleButton)