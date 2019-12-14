import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Save from '@material-ui/icons/Save';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/SettingsRounded'
import ModalSettings from '../Modals/ModalSettings'


const styles = theme => ({
    root: {
        right: 0,
        paddingTop: 8,
    },
    settings: {
        position: "absolute",
        bottom: 8,
    },
});


class DrawerMenuList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadModalOpen: false,
            settingsModalOpen: false,
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
                <ListItem button onClick={this.openLoadModal}>
                    <ListItemIcon>
                        <CloudDownload />
                    </ListItemIcon>
                    <ListItemText primary="Load" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Save />
                    </ListItemIcon>
                    <ListItemText primary="Save" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Publish" />
                </ListItem>
                <ListItem button onClick={this.openSettingsModal} className={classes.settings}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
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