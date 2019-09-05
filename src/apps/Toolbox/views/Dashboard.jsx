import { SvgIcon } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import PropTypes from "prop-types";
import React, { Component } from 'react';
import { compose } from 'recompose';
import ModalLoad from '../../Letters/containers/ModalLoad';
import AuthButton from './AuthButton';
import ModalFirebase from './ModalFirebase';

const styles = theme => ({
    // Dashboard is topmost component, so it should also handle global css for now
    '@global': {
        'body': {
            fontFamily: 'Poppins',
        },
        '*::-webkit-scrollbar': {
            height: 14,
            width: 16,
            border: 'solid 4px transparent'
        },
        '*::-webkit-scrollbar-thumb': {
            boxShadow: 'inset 0 0 10px 10px #7289da',
            border: '4px solid transparent',
            borderRadius: 12,
        },
    },
    root: {
        // color: 'red',
    },
    header: {
        height: 48,
        background: "white",
        boxShadow: "0 1px 0 rgba(0,0,0,.1), 0 1.5px 0 rgba(0,0,0,.025), 0 2px 0 rgba(0,0,0,.025)",
    },
    currentApp: {
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
})

export const Dashboard = compose(
    inject('store'),
    withStyles(styles),
    observer
)(
    class Dashboard extends Component {

        @observable expanded = false

        @action expand = () => {
            this.expanded = !this.expanded
        }

        render() {
            const { store, classes, variant, shelf, sidebar, header, currentApp, history } = this.props
            console.log('history', this.props)
            const SidebarWrapped = sidebar
            const {editorStore, lettersStore, sessionStore} = store
            return (
                <Box flexGrow={1} display="flex" flexDirection="row" justifyContent="flex-start" height="100%" >
                    {/* <Box width={72}  >
                        {shelf}
                    </Box> */}
                    <Box width={240}>
                        {sidebar}
                    </Box>
                    <Box flexGrow={1} bgcolor="#f6f6f7" display="flex" flexDirection="column">
                        <Box className={classes.header} px={1} display="flex" alignItems="center" justifyContent="flex-start" >
                            {header}
                            <Box className={classes.title} height={48} display="flex" alignItems="center" fontSize={20} mx={1}>
                                <Box mx={2} display="flex" alignItems="center"  >
                                    <ScribeIcon />
                                </Box>
                                Scribe
                            </Box>
                            <Box flexGrow={1} />
                            <AuthButton {...{ editorStore, lettersStore, sessionStore, label: 'Sign In' }}/>
                            {/* <Button color="inherit" onClick={() => this.props.store.scribeStore.createSession()} >Create</Button>
                            <Button color="inherit" onClick={() => this.props.store.scribeStore.closeSession()} >Destroy</Button> */}
                        </Box>
                        <Box className={classes.currentApp} flexGrow={1} id="CurrentApp">
                            {currentApp}
                            <ModalLoad />
                            <ModalFirebase />
                            <div style={{ height: '600%' }} />
                        </Box>
                    </Box>
                </Box>
            )
        }
    }
)

Dashboard.propTypes = {
    store: PropTypes.object
}

const ScribeIcon = () => (
    <SvgIcon viewBox='0 0 512 512'>
        <path d="M71.46 287.61c-4.85 41.95-7.25 84.14-7.38 126.37L7.03 471.03c-9.37 9.37-9.37 24.57 0 33.94 9.37 9.37 24.57 9.37 33.94 0l57.05-57.05c42.23-.12 84.42-2.53 126.37-7.38C473.8 415.14 508.44 51.72 512 0 460.28 3.56 96.87 38.2 71.46 287.61zm147.42 105.25c-23.41 2.71-47.3 4.36-71.31 5.51L193.94 352h125.37c-27.89 21.72-60.89 36.83-100.43 40.86zM352.81 320H225.94l64-64h106.12c-12.11 23.11-26.54 44.76-43.25 64zm-30.87-96l13.54-13.54c9.37-9.37 9.37-24.57 0-33.94-9.37-9.37-24.57-9.37-33.94 0l-187.9 187.9c1.16-24.09 2.83-48.13 5.58-71.96C136.33 124.4 349.77 70.87 457.48 54.51c-6.89 45.3-20.53 109.25-46.37 169.49h-89.17z" />
    </SvgIcon>
)