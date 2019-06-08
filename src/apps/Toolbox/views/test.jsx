import React from 'react';
import { withStyles } from "@material-ui/core/styles";

const styles = {
    root: {
        // css atrributes
    },
};

class TodoList extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                {/* Children */}
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(TodoList);