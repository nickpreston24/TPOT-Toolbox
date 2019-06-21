import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Grow from "@material-ui/core/Grow";
// import Avatar from "@material-ui/icons/AccountCircleRounded";
import Avatar from '@material-ui/core/Avatar'
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountIcon from "@material-ui/icons/AccountBoxOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import AvatarImage from '../../../shared/media/avatar.jpg';

const styles = theme => ({
    root: {
        color: `${theme.palette.primary.dark} !important`,
        borderRadius: 58,
        // display: 'flex',
        // flex: 1,
        // float: 'right',
        // position: "absolute",
        // right: 0,
        // top: "50%",
        // transform: "translateY(-50%)",
        // width: "auto",
        // marginRight: 12
    },
    margin: {}
})

class Auth extends Component {

    componentDidMount() {
        console.log('Auth props: ', this.props.classes)
        this.props.editorStore.focus()
    }

    state = {
        anchorEl: null,
    };

    setRef = element => {
        // console.log(element)
        this.setState({ anchorEl: element })
    }

    render() {

        const { classes } = this.props;
        const { anchorEl } = this.state
        const { currentModal, setCurrentModal } = this.props.lettersStore
        const { signOut, authUser, auth, signIn } = this.props.sessionStore

        console.log('auth? ', !!auth && auth)
        console.log('sessionStore? ', !!this.props.sessionStore && this.props.sessionStore);
        console.log('AuthButton => auth user loaded? ', !!authUser && authUser);
        console.log('signOut => signout exists? ', !!signOut);

        return (
            <div
                className={classes.root}
                ref={this.setRef}
            >
                {authUser ? (
                    <div>
                        <Slide direction="left" in={true} timeout={{ enter: 700 }}>
                            <Button
                                // className={classes.button}
                                aria-owns={anchorEl ? "logout-menu" : null}
                                aria-haspopup="true"
                                onClick={() => setCurrentModal('Firebase Dropdown')}
                                varient="contained"
                            >
                                {authUser.email}
                                <Avatar src={AvatarImage} style={{ paddingLeft: 10, maxHeight: 24, maxWidth: 24 }} />
                            </Button>
                        </Slide>
                        <Menu
                            id="logout-menu"
                            anchorEl={anchorEl}
                            open={'Firebase Dropdown' === currentModal}
                            onClose={() => setCurrentModal(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem className={classes.menuItem}>
                                <ListItemIcon className={classes.icon}>
                                    <AccountIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Account" />
                            </MenuItem>
                            <MenuItem className={classes.menuItem}>
                                <ListItemIcon className={classes.icon}>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Details" />
                            </MenuItem>
                            <Divider />
                            <MenuItem className={classes.menuItem} onClick={_ => signOut(setCurrentModal)
                            }  >
                                <ListItemIcon className={classes.icon}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                            </MenuItem>
                        </Menu>
                    </div>
                )
                    : (
                        <Grow in={true} timeout={{ enter: 400 }}>
                            <Button color="inherit" variant="outlined" onClick={ () => setCurrentModal('Firebase Modal') }>
                                Log In
                        </Button>
                        </Grow>
                    )}

            </div>
        );
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    inject("lettersStore", "sessionStore", "editorStore"),
    withStyles(styles),
    observer
)(Auth);