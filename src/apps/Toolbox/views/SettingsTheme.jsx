import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    avatar: {
        height: 80,
        width: 80,
        display: "block",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: 32,
        marginBottom: 32,
    }

});

class Theme extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            editor: false,
        }
    }

    handleClose = () => {
        this.props.onUpdate(false);
    };

    handleChange = (event, value) => {
        this.setState({ value: value });
    };

    render() {
        const { classes } = this.props;

        // const tabs = [
        //   {
        //     name: "Account",
        //     icon: <Account/>,
        //   },
        //   {
        //     name: "Prefrences",
        //     icon: <Tune/>,
        //   },
        //   {
        //     name: "Theme",
        //     icon: <Palette/>,
        //   }
        // ]

        return (
            <div className={classes.root}>
                {!this.state.editor &&
                    "main"
                }
                {this.state.editor &&
                    "editor"
                }
            </div>
        );
    }
}

Theme.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Theme)