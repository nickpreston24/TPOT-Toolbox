import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ProfilePic from '../media/avatar.jpg'

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

class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
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
                <Avatar src={ProfilePic} className={classes.avatar} />
                <Typography align="center">Victor Hafichuk</Typography>

                {/* {this.state.value === 0 && <div>Item One</div>} */}
            </div>
        );
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account)