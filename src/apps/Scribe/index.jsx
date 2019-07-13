import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import Editor from '../Editor/Editor';
import { BrowserRouter, Link, Route, Redirect, Switch, withRouter } from 'react-router-dom'

export const Scribe = compose(
    inject('store'),
    observer
)(
    class Scribe extends Component {

        componentDidMount() {
            console.log('mount')
            let { store, match, history, location } = this.props
            store.scribeStore.register({match, history, location})
        }

        render() {
            const { match, store } = this.props
            const session = this.props.store.scribeStore.currentSession
            console.log(match)
            return (
                <>
                    <Route exact path={`${match.path}`} component={Homepage} />
                    <Route path={`${match.path}/:document`} component={RoutedEditor} />
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
            this.props.store.scribeStore.createSession()
        }

        render() {
            const session = this.props.store.scribeStore.currentSession
            const { match } = this.props
            console.log(this.props)
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
        // componentDidMount() {
        //     alert('component did mount!')
        // }

        render() {
            const session = this.props.store.scribeStore.currentSession
            const { match } = this.props
            console.log(match)
            return (
                <>
                    <Editor session={session} />
                    <CodeView code={session.code} />
                </>
            )
        }
    }
)

const CodeView = observer(({ code }) => (
    <p>{code}</p>
))