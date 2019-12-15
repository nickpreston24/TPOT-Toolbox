import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import PropTypes from 'prop-types';
import React from 'react';
import ModalSettings from '../presentation/ModalSettings';




const styles = theme => ({
    root: {
        paddingTop: 4,
        // paddingBottom: 8,
        // marginBottom: 8,
        borderTop: `1px solid ${theme.palette.secondary.light}`,
    },
    settings: {
        // position: "absolute",
        // bottom: 8,
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
        color: theme.palette.secondary.textMain,
    },
    active: {
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

        return (
            <div className={classes.root}>
                <ListItem button className={classes.active} onClick={this.openSettingsModal}>
                    <ListItemIcon className={classes.letter}>
                        <SettingsIcon  />
                    </ListItemIcon>
                    {/* <ListItemText
                        primary="Settings"
                        classes={{ primary: classes.secondaryText, secondary: classes.secondaryText }}
                        primaryTypographyProps={{ noWrap: true }}
                    /> */}
                </ListItem>
                <ModalSettings open={this.state.settingsModalOpen} onUpdate={this.updateSettingsModal} value={1} />
            </div>
        );
    }
}

DrawerMenuList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenuList);