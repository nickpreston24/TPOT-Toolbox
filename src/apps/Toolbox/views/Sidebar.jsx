import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import PropTypes from "prop-types";
import React, { Component } from 'react';
import { compose } from 'recompose';
import { faEnvelopeOpen, faHdd, faPaperPlane, faSave, faTrashAlt, faFile } from '@fortawesome/free-regular-svg-icons';
import { faGlasses, faGripHorizontal, faBars, faEdit, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = theme => ({
    root: {
        transition: 'all 220ms ease-in-out'
    },
    title: {
        boxShadow: "0 1px 0 rgba(32,34,37,.7), 0 2px 0 rgba(0,0,0,.06)",
    },
})

export const Sidebar = compose(
    inject('store'),
    withStyles(styles),
    observer
)(
    class Sidebar extends Component {

        render() {
            console.log('sidebar renders');
            const { store, classes, history } = this.props
            const navMenu = [
                {
                    name: 'Checkout',
                    icon: faCartArrowDown,
                    action: () => history.push('/scribe/checkout'),
                },
                {
                    name: 'Editor',
                    icon: faEdit,
                    action: () => history.push('/scribe/edit'),
                }
            ]
            const actionMenu = [
                {
                    name: 'Save',
                    icon: faSave,
                    action: () => {
                        history.push('/scribe/edit');
                        store.scribeStore.saveSession();
                    },
                },
                {
                    name: 'New',
                    icon: faFile,
                    action: () => {
                        history.push('/scribe/edit');
                        store.scribeStore.createSession();
                    },
                },
                {
                    name: 'Load',
                    icon: faHdd,
                    action: () => {
                        history.push('/scribe/edit');
                        console.log('this should be firing!');
                        store.lettersStore.setCurrentModal('LoadScreen');
                    },
                },
                {
                    name: 'Reset',
                    icon: faTrashAlt,
                    action: () => {
                        history.push('/scribe/edit');
                        store.scribeStore.clearSession();
                    },
                },
                {
                    name: 'Preview',
                    icon: faGlasses,
                    action: () => history.push('/scribe/preview'),
                },
                {
                    name: 'Publish',
                    icon: faPaperPlane,
                    action: () => history.push('/scribe/publish'),
                }
            ]
            return (
                <Box width={240} height='100%' >
                    <Box className={classes.title} height={48} display="flex" alignItems="center" fontSize={20} mx={1}>
                        <Box mx={2} display="flex" alignItems="center"  >
                            <FontAwesomeIcon icon={faEnvelopeOpen} size="lg" />
                        </Box>
                        TPOT Toolbox
                    </Box>
                    <Box>
                        <List dense>
                            <ListSubheader component={Box} >Navigate</ListSubheader>
                            {navMenu.map((item, index) => {
                                const Icon = item.icon || faBars
                                return (
                                    <ListItem button onClick={item.action} key={index}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={Icon} size="lg" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.name}
                                        // secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>
                                )
                            })}
                            <ListSubheader component={Box} >Editor Actions</ListSubheader>
                            {actionMenu.map((item, index) => {
                                const Icon = item.icon || faBars
                                return (
                                    <ListItem button onClick={item.action} key={index}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={Icon} size="lg" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.name}
                                        // secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Box>
            )
        }
    }
)

Sidebar.propTypes = {
    store: PropTypes.object
}

// const ScribeIcon = () => (
//     <SvgIcon viewBox='0 0 512 512'>
//         <path d="M71.46 287.61c-4.85 41.95-7.25 84.14-7.38 126.37L7.03 471.03c-9.37 9.37-9.37 24.57 0 33.94 9.37 9.37 24.57 9.37 33.94 0l57.05-57.05c42.23-.12 84.42-2.53 126.37-7.38C473.8 415.14 508.44 51.72 512 0 460.28 3.56 96.87 38.2 71.46 287.61zm147.42 105.25c-23.41 2.71-47.3 4.36-71.31 5.51L193.94 352h125.37c-27.89 21.72-60.89 36.83-100.43 40.86zM352.81 320H225.94l64-64h106.12c-12.11 23.11-26.54 44.76-43.25 64zm-30.87-96l13.54-13.54c9.37-9.37 9.37-24.57 0-33.94-9.37-9.37-24.57-9.37-33.94 0l-187.9 187.9c1.16-24.09 2.83-48.13 5.58-71.96C136.33 124.4 349.77 70.87 457.48 54.51c-6.89 45.3-20.53 109.25-46.37 169.49h-89.17z" />
//     </SvgIcon>
// )

// const FileIcon = () => (
//     <SvgIcon viewBox='0 0 512 512'>
//         <path d="M71.46 287.61c-4.85 41.95-7.25 84.14-7.38 126.37L7.03 471.03c-9.37 9.37-9.37 24.57 0 33.94 9.37 9.37 24.57 9.37 33.94 0l57.05-57.05c42.23-.12 84.42-2.53 126.37-7.38C473.8 415.14 508.44 51.72 512 0 460.28 3.56 96.87 38.2 71.46 287.61zm147.42 105.25c-23.41 2.71-47.3 4.36-71.31 5.51L193.94 352h125.37c-27.89 21.72-60.89 36.83-100.43 40.86zM352.81 320H225.94l64-64h106.12c-12.11 23.11-26.54 44.76-43.25 64zm-30.87-96l13.54-13.54c9.37-9.37 9.37-24.57 0-33.94-9.37-9.37-24.57-9.37-33.94 0l-187.9 187.9c1.16-24.09 2.83-48.13 5.58-71.96C136.33 124.4 349.77 70.87 457.48 54.51c-6.89 45.3-20.53 109.25-46.37 169.49h-89.17z" />
//     </SvgIcon>
// )
