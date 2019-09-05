import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import { matchPath } from 'react-router'
import Editor from '../Editor/Editor';
import { BrowserRouter, Link, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { Tab, Tabs, Button, SvgIcon } from '@material-ui/core'
import { toJS } from 'mobx';
import { LoadScreen } from './views/LoadScreen'

export const Scribe = compose(
    inject('store'),
    // observer
)(
    class Scribe extends Component {

        render() {
            const { match, history, location } = this.props
            // let redirect = !matchPath(window.location.pathname, {path: '/scribe'}).params.document
            return (
                <>
                    {/* <Route exact path={`/scribe`} component={Homepage} /> */}
                    <Route path={`/scribe/load`} render={() => <h1>Router</h1>} />
                    <Route exact path={`/scribe`} component={RoutedEditor} />
                    <LoadScreen base="/:mode" path="/load" {...{ match, history}} />
                    {/* {redirect && <Redirect to='/scribe'  />} */}
                </>
            )
        }
    }
)

export const Homepage = compose(
    inject('store'),
    observer
)(
    class Homepage extends Component {
        // componentDidMount() {
        //     alert('component did mount!')
        // }

        handleFile = event => {
            const file = event.target.files[0];
            this.props.store.scribeStore.createSession(file)
        }

        createNew = () => {
            this.props.store.routing.push('/scribe/Untitled.docx')
        }

        render() {
            const session = this.props.store.scribeStore.currentSession
            const { match } = this.props
            // console.log(this.props)
            return (
                <>
                    <h1>Welcome to Scribe!</h1>
                    <button onClick={this.createNew}>Create new Note</button>
                    <input type="file" onChange={this.handleFile} accept=".docx" />
                </>
            )
        }
    }
)

export const RoutedEditor = compose(
    inject('store'),
    observer
)(
    class RoutedEditor extends Component {

        render() {
            // const session = this.props.store.scribeStore.sessions[this.props.store.scribeStore.current]
            // const session = this.props.store.scribeStore.currentSession
            const { match, store } = this.props
            const { scribeStore, routing } = store
            const { currentSession, current, sessions, session } = scribeStore
//            console.log('sesss', scribeStore.session)
            return (
                <>
                    <Editor {...{match, session}}/>
                </>
            )
        }
    }
)

const SessionTabs = observer(({store}) => (
    <Tabs value={store.current}>
        {store.sessions.map((session, index) => (
            <Tab label={session.name} onClick={() => store.setCurrentSession(session.name)} icon={
                <ScribeIcon onClick={() => store.closeSession(index)} />
            }/>
        ))}
    </Tabs>
))

const CodeView = observer(({ code }) => (
    <p>{code}</p>
))

const ScribeIcon = () => (
    <SvgIcon viewBox='0 0 512 512' fontSize="small">
        <path fill="#324a5e" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" />
    </SvgIcon>
)