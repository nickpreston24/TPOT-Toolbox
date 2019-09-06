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
import { hot } from 'react-hot-loader'
import { Dashboard } from './views/Dashboard';
import { Box } from '@material-ui/core';
import { Shelf } from './views/Shelf'
import { ShelfButton } from './views/ShelfButton';
import { Sidebar } from './views/Sidebar';
import { Scribe } from '../Scribe'
import { BrowserRouter, Link, Route, Redirect, Switch } from 'react-router-dom'
import { Header } from './views/Header';

// Initilize Root Store
const store = new MobxStore()
// const browserHistory = createBrowserHistory()
// const history = syncHistoryWithStore(browserHistory, store.routing)

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
        // primary: {
        //     light: '#757ce8',
        //     // main: '#cddc39',
        //     dark: '#002884',
        //     contrastText: '#fff',
        // },
        // secondary: {
        //     light: '#ff7961',
        //     // main: '#f44336',
        //     dark: '#ba000d',
        //     contrastText: '#000',
        // },
        accent: {
            pink: '#FF0099'
        },
        background: {
            default: '#FFF'
            // default: '#ede5da'
            // default: '#313439'
        }
    },
    typography: {
        fontFamily: "Poppins, 'Helvetica Neue','Helvetica','Arial',sans-serif",
        useNextVariants: true,
    },
});

const styles = theme => ({
    root: {
        // color: 'red',
    },
})

export default () =>
    <Provider store={store} >
        <ThemeProvider theme={theme}>
            <SnackbarProvider {...snackbarOptions}>
                <BrowserRouter>
                    <Toolbox store={store} />
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider >

const Toolbox = compose(
    withSnackbar,
    inject('store'),
    withStyles(styles),
    hot(module)
)(
    class Toolbox extends Component {

        componentDidMount() {
            const { servicesStore } = this.props.store
            const { enqueueSnackbar, closeSnackbar } = this.props
            // console.log(this.props)

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
                                    <Header />
                                }
                                currentApp={
                                    <Box  display="flex" justifyContent="center" alignItems="flex-start" pt={4}>
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
                    <LinkOverlay />
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

const LinkOverlay = observer(() =>
    <ul style={{
        position: 'fixed', bottom: 0, zIndex: 9999, right: 20, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0, fontSize: 12,
    }}>
        <li><Link to="/">/</Link></li>
        <li><Link to="/scribe">/scribe</Link></li>
        <li><Link to="/scribe/checkout">/scribe/checkout</Link></li>
        <li><Link to="/scribe/Untitled.docx">/scribe/Untitled</Link></li>
    </ul>
)
