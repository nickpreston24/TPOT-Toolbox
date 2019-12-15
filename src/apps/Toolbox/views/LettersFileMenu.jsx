import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import LoadIcon from '@material-ui/icons/Folder';
import Save from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
import React from 'react';

import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'



const drawerWidth = 200;

const styles = theme => ({
    drawerPaper: {
        // border: '4px solid yellow',
        overflow: 'hidden',
        position: 'relative',
        float: 'left',
        height: 'calc(100vh - 64px)',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        // width: theme.spacing(7),
        // [theme.breakpoints.up('sm')]: {
        //     width: theme.spacing(9),
        // },
    },
    preview: {
        position: "fixed",
        right: 20,
        bottom: 20
    },
});

class MiniDrawer extends React.Component {
    // constructor(props) {
    //         super(props);
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

    handleDrawerClose = () => {
        this.props.drawerOpen = false
//        console.log("clicked!")
    }

    saveEditorStateToDisk = () => {
        window.postMessage({ event: "draftjs-editor-reload" }, "*") // sends to DraftJS WYSIWYG Editor
    }

    render() {
        const { classes } = this.props;
        const { notify } = this.props.lettersStore

        const menus = [
            {
                name: "Load",
                secondary: "",
                icon: <LoadIcon />,
                active: true,
                handler: () => {
                    this.openLoadModal();
                    this.props.onUpdate(false)
                }
            },
            {
                name: "Save",
                secondary: "",
                icon: <Save />,
                active: true,
                handler: () => {
                    this.props.editorStore.saveSession(notify)
                }
            },
            // {
            //     name: "Drafts",
            //     secondary: "",
            //     icon: <DraftsIcon />,
            //     active: true,
            //     handler: () => {
            //         this.props.lettersStore.clearEditor()
            //     }
            // },
            {
                name: "Publish",
                secondary: "",
                icon: <SendIcon />,
                active: true,
                handler: () => {
                    this.props.lettersStore.togglePublishModal()
                }
            },
        ]

        return (
            <React.Fragment>
                {/* <DrawerMenuList onClick={this.handleDrawerClose} /> */}

                <Menu
                    id="logout-menu"
                    anchorEl={this.props.anchorEl}
                    open={this.props.open}
                    onClose={this.props.onClose}
                    transformOrigin={{ vertical: -64, horizontal: "left" }}
                >
                    {menus.map(menu => {
                        return (
                            <MenuItem className={classes.menuItem} onClick={menu.handler} key={menu.name}>
                                <ListItemIcon className={classes.icon}>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary={menu.name} />
                            </MenuItem>
                        );
                    })}

                    {/* <MenuItem className={classes.menuItem}>
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
                    <MenuItem className={classes.menuItem} onClick={this.handleLogout}  >
                        <ListItemIcon className={classes.icon}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                    </MenuItem> */}
                </Menu>


                {/* <Tooltip title="Preview Page" TransitionComponent={Zoom}>
                    <Button variant="fab" color="primary" aria-label="Preview" className={classes.preview}>
                        <PreviewIcon />
                    </Button>
                </Tooltip> */}
            </React.Fragment>
        )
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(MiniDrawer);

export default compose(
    inject('lettersStore', 'editorStore'),
    withStyles(styles),
    observer
)(MiniDrawer);

















// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import { mailFolderListItems, otherMailFolderListItems } from './DrawerMenuList';

// const styles = {
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// };

// class TemporaryDrawer extends React.Component {
//   state = {
//     left: true,
//   };

//   toggleDrawer = (side, open) => () => {
//     this.setState({
//       [side]: open,
//     });
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <div>
//         <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
//         <Drawer hideBackdrop="false" variant="persistent" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
//           <div
//             tabIndex={0}
//             role="button"
//             onClick={this.toggleDrawer('left', false)}
//             onKeyDown={this.toggleDrawer('left', false)}
//           >
//           <List>{mailFolderListItems}</List>
//           </div>
//         </Drawer>
//       </div>
//     );
//   }
// }

// TemporaryDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(TemporaryDrawer);


