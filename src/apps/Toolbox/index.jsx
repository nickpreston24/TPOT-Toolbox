import './App.css';
import React, { Component } from 'react'
import PropTypes from "prop-types";
import { compose } from 'recompose'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, withStyles } from "@material-ui/styles";
import { SnackbarProvider, withSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react'
import { Provider } from 'mobx-react';
import MobxStore from '../../shared/stores'
import { Dashboard } from './views/Dashboard';
import { Box } from '@material-ui/core';
import { Shelf } from './views/Shelf'
import { ShelfButton } from './views/ShelfButton';
import { Sidebar } from './views/Sidebar';
import { Scribe } from '../Scribe'
import { BrowserRouter, Link, Route, Redirect, Switch } from 'react-router-dom'
import CloudFilesProvider from '../../contexts/CloudFiles'

// Initilize Root Store
const store = new MobxStore()

const snackbarOptions = {
    maxSnack: 3,
    disableWindowBlurListener: true,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
    },
}

const theme = createMuiTheme({
    palette: {
        accent: {
            pink: '#FF0099'
        },
        background: {
            default: '#FFF'
        }
    },
    typography: {
        fontFamily: "Poppins, 'Helvetica Neue','Helvetica','Arial',sans-serif",
        useNextVariants: true,
    },
});

const styles = theme => ({
    root: {
    },
})

const Toolbox = compose(
    withSnackbar,
    inject('store'),
    withStyles(styles),
    observer,
)(
    class Toolbox extends Component {

        componentDidMount() {
            const { servicesStore } = this.props.store
            const { enqueueSnackbar, closeSnackbar } = this.props

            // : Pass the calling function for notifications to the store
            servicesStore.setNotifyFunctions({ enqueueSnackbar, closeSnackbar })
        }

        render() {
            return (
                <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-start" style={{
                    position: 'absolute', boxSizing: 'border-box', height: '100%', width: '100%', overflow: 'hidden'
                }}>
                    <Switch>
                        <Route path={`/`} render={({ match, history, location }) => (
                            <Dashboard
                                shelf={
                                    <Shelf >
                                        <ShelfButton tooltip='Scribe' icon='scribe' path='/scribe' color="#f9b54c" active={true} />
                                    </Shelf>
                                }
                                sidebar={
                                    <Sidebar {...{ history }} />
                                }
                                header={
                                    null
                                }
                                currentApp={
                                    <Box display="flex" justifyContent="center" alignItems="flex-start" pt={4}>
                                        <Switch {...{ location }}>
                                            <Route path="/scribe" component={Scribe} />
                                            <Route render={() => <Redirect to={`/scribe/overview`} />} />
                                        </Switch>
                                    </Box>
                                }
                            />
                        )} />
                        <Route render={() => <h1>404</h1>} />
                    </Switch>
                </Box>
            );
        }
    }
)

Toolbox.propTypes = {
    classes: PropTypes.object,
    closeSnackbar: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired
}

export default () =>
    <Provider store={store} >
        <ThemeProvider theme={theme}>
            <SnackbarProvider {...snackbarOptions}>
                <BrowserRouter>
                    <CloudFilesProvider>
                        <Toolbox store={store} />
                    </CloudFilesProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider >