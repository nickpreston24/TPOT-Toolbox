import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    }
});

class SiteScan extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { root } = this.props.styles;
        return <>
            <h2>Site Scan!</h2>
            <div className={root}>
            </div>
        </>
    }
}
export default withStyles(styles)(SiteScan);