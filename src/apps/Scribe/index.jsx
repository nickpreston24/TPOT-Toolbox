import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import Editor from '../Editor/Editor';
import { Tab, Tabs, SvgIcon } from '@material-ui/core'
import { PublishPage } from './views/PublishPage';
import { Route, Redirect, Switch } from 'react-router-dom'

export const Scribe = compose(
    inject('store'),
    observer
)(
    class Scribe extends Component {

        render() {
            const { match, history, location } = this.props
            return (
                <Route path={`${match.path}/:mode`} children={({ match, location, ...rest }) => {
                    console.log('PAZ', match)
                    return (
                        <Switch location={location}>
                            <Route exact path={`/scribe`} render={() => <h2>Welcome to Scribe!</h2>} />
                            <Route path={`/scribe/overview`} render={() => <h2>Overview</h2>} />
                            <Route path={`/scribe/checkout`} render={() => <h2>Checkout</h2>} />
                            <Route path={`/scribe/edit`} component={RoutedEditor} />
                            <Route path={`/scribe/preview`} render={() => <h2>Preview</h2>} />
                            <Route path={`/scribe/publish`} component={PublishPage} />
                            {match && <Route render={() => <Redirect to={`/scribe/overview`} />} />}
                        </Switch>
                    )
                }} />
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
            const { scribeStore } = store
            const { session } = scribeStore
            // console.log('sesss', scribeStore.session)
            return (
                <Editor {...{ session }} />
            )
        }
    }
)

const SessionTabs = observer(({ store }) => (
    <Tabs value={store.current}>
        {store.sessions.map((session, index) => (
            <Tab label={session.name} onClick={() => store.setCurrentSession(session.name)} icon={
                <ScribeIcon onClick={() => store.closeSession(index)} />
            } />
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