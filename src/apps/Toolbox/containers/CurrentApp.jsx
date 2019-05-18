import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { BrowserRouter, Link, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { Loading } from '../views/Loading';
import Loadable from "react-loadable";
import Header from './Header';
import Notifier from './Notifier';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Screen } from './Screen';

const Letters = Loadable({ loader: () => import('../../Letters'), loading: Loading, });
// Letters.preload()

const styles = theme => ({
    root: {
        // justifyContent: 'flex-start',
        flexFlow: 'column nowrap',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexGrow: 1,
    },
    currentApp: {
        // border: '4px solid lime !important',
        // boxSizing: 'border-box',
        overflow: 'hidden',
        // background: `#e0ddd1`,
        overflowY: 'hidden',
        // position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
    },
})

class CurrentAppClass extends Component {

    @observable apps = {
        default: () => 'Welcome',
        letters: () => <Letters />,
        settings: () => 'Settings'
    }

    @action switchApp = () =>
        this.apps = null

    render() {
        const { store, classes, location, match, history } = this.props
        const { switchApp, currentApp, apps } = this
        // console.log("PATH", match.path, match.params)
        return (
            <div id="Content" className={classes.root}>
                <Header id="Header" style={{ background: '#3e4552 !important' }} />
                <div id="Current App" className={classes.currentApp}>
                    <Route path={`${match.path}:app`} children={
                        ({ location, match }) => {
                            const appRoute = match ? match.params.app : null
                            const App = appRoute ? apps[appRoute] : apps[Object.keys(apps)[0]]// console.log(App)
                            console.log(appRoute)
                            return (
                                <TransitionGroup>
                                    <CSSTransition key={location.key} classNames="carousel" timeout={1500}>
                                        <div> {/* react-transition-group issue: 208 fix */}
                                            <Switch location={location}>
                                                <Route path={`/`} render={() => <Screen><App {...{ location, match }} /></Screen>} />
                                            </Switch>
                                        </div>
                                    </CSSTransition>
                                </TransitionGroup>
                            )
                        }
                    } />

                    {/* <Route path={`${match.path}`} render={
                        ({ match }) => (
                            <Route path={`${match.path}:app`} children={
                                ({ location, match }) => {
                                    const appRoute = match ? match.params.app : null
                                    const App = appRoute ? apps[appRoute] : apps.welcome // console.log(App)
                                    console.log(appRoute)
                                    return <App {...{ location, match }} />
                                }
                            } />
                        )
                    } /> */}

                    {/* <Switch location={location}>
                        <Route path={`${match.path}`} render={
                            ({ match }) => (
                                <Route path={`${match.path}:app`} children={
                                    ({ location, match }) => {
                                        const appRoute = match ? match.params.app : null
                                        const App = appRoute ? apps[appRoute] : apps.welcome // console.log(App)
                                        console.log(appRoute)
                                        return <App {...{ location, match }} />
                                    }
                                } />
                            )
                        } />
                    </Switch> */}
                    <Notifier />
                </div>
            </div>
        )
    }
}

export const CurrentApp = compose(
    inject('store'),
    withStyles(styles),
    observer
)(CurrentAppClass)


// <TransitionGroup>
// <CSSTransition key={location.key} classNames="message" timeout={1000}>
//     <div> {/* react-transition-group issue: 208 fix */}
//         <Switch location={location}>
//             <Route exact path={`${match.path}letters`} component={apps.letters} />
//             <Route exact path={`${match.path}settings`} component={apps.settings} />
//             {/* <Route exact path="/state-b" component={B} /> */}
//         </Switch>
//     </div>
// </CSSTransition>
// </TransitionGroup>