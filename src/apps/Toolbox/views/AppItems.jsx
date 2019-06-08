import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import LettersIcon from '../media/letters_icon.png';
import ModalLoad from '../presentation/ModalLoad';
import ModalSettings from '../presentation/ModalSettings';




const styles = theme => ({
    root: {
        // borderRight: '4px solid #1E90FF'
    },
    settings: {
        position: "absolute",
        bottom: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 0,
    },
    primaryText: {
        color: theme.palette.secondary.textLight,
    },
    secondaryText: {
        color: theme.palette.secondary.textDark,
    },
    letter: {
        fontSize: 32,
        color: "#91ce34",
    },
    active: {
        background: theme.palette.secondary.dark,
        borderRight: `4px solid ${theme.palette.accent}`
    }
});


class DrawerMenuList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadModalOpen: false,
            settingsModalOpen: false,
            secondary: true,
        }
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
                primary: "Ember",
                secondary: "edit letters & translations",
                icon: LettersIcon,
                active: true,
                // handler: () => {
                //     this.handleSelection("disk");
                // }
            },
            // {
            //     primary: "Pidgeon",
            //     secondary: "reorder emails by date",
            //     icon: ReorderIcon,
            //     active: false,
            //     handler: () => {
            //         this.handleSelection("disk");
            //     }
            // },
        ]

        return (
            <div className={classes.root}>
                {accounts.map(account => {
                    return (
                        <ListItem button className={account.active ? classes.active : null}  key={account.primary}>
                            <ListItemAvatar>
                                {/* <SvgIcon component={account.icon} className={classes.letter} /> */}
                                <Avatar src={account.icon} className={classes.avatar} />
                            </ListItemAvatar>
                            {/* <ListItemText
                                primary={account.primary}
                                secondary={account.secondary ? account.secondary : null}
                                classes={{ primary: classes.primaryText, secondary: classes.secondaryText }}
                                primaryTypographyProps={{ noWrap: true }}
                                secondaryTypographyProps={{ noWrap: false }}
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