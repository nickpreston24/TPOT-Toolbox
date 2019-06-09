import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import DriveIcon from '../media/drive.png';
import FirebaseIcon from '../media/firebase_icon.png';
import ModalLoad from './ModalLoad';
import ModalSettings from '../ModalSettings';




const styles = theme => ({
    root: {
    },
    settings: {
        position: "absolute",
        bottom: 8,
    },
    avatar: {
        width: 32,
        height: 32,
    },
    primaryText: {
        color: theme.palette.secondary.textLight,
    },
    secondaryText: {
        color: theme.palette.secondary.textDark,
    },
    active: {
        background: theme.palette.primary.darkS
    }
});


class DrawerMenuList extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         loadModalOpen: false,
    //         settingsModalOpen: false,
    //         secondary: true,
    //     }
    // }
    state = {
        loadModalOpen: false,
        settingsModalOpen: false,
        secondary: true,
    }


    openLoadModal = () => {
        this.setState({ loadModalOpen: true })
    }

    updateLoadModal = (bool) => {
        this.setState({ loadModalOpen: bool })
    }

    openSettingsModal = () => {
        this.setState({ settingsModalOpen: true })
    }

    updateSettingsModal = (bool) => {
        this.setState({ settingsModalOpen: bool })
    }

    render() {
        const { classes } = this.props;

        const accounts = [
            {
                primary: "TPOT Cloud",
                secondary: "",
                icon: FirebaseIcon,
                active: true,
                handler: () => {
                    // this.handleSelection("disk");
                }
            },
            {
                // primary: "Google Drive",
                secondary: "Coming Soon...",
                icon: DriveIcon,
                handler: () => {
                    // this.handleSelection("google");
                }
            }
        ]

        return (
            <div className={classes.root}>
                {accounts.map((account, index) => {
                    return (
                        <ListItem button className={account.active ? classes.active : null} onClick={null} key={index}>
                            <ListItemAvatar>
                                <Avatar src={account.icon} className={classes.avatar} />
                            </ListItemAvatar>
                            {/* <ListItemText
                                primary={account.primary}
                                secondary={account.secondary ? account.secondary : null}
                                classes={{ primary: classes.primaryText, secondary: classes.secondaryText }}
                                primaryTypographyProps={{ noWrap: true }}
                                secondaryTypographyProps={{ noWrap: true }}
                            /> */}
                            {/* <ListItemSecondaryAction>
                                <IconButton aria-label="Delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction> */}
                        </ListItem>
                    );
                })}
                {/* <ModalLoad open={this.state.loadModalOpen} onUpdate={this.updateLoadModal} /> */}
                <ModalSettings open={this.state.settingsModalOpen} onUpdate={this.updateSettingsModal} value={1} />
            </div>
        );
    }
}

DrawerMenuList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenuList);