import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import Editor from '../Editor/Editor';
import { PublishPage } from './views/PublishPage';
import { Route, Switch } from 'react-router-dom'
import { Collection } from 'firestorter';

export const Scribe = compose(
    inject('store'),
    observer
)(
    class Scribe extends Component {

        render() {
            const { match, store } = this.props
            const { scribeStore } = store
            const { session } = scribeStore
            const { editorStore } = session
            return (
                <Route path={`${match.path}/:mode`} children={({ match, location, ...rest }) => {
                    return (
                        <Switch location={location}>
                            <Route exact path={`/scribe`} render={() => <h2>Welcome to Scribe!</h2>} />
                            <Route path={`/scribe/overview`} render={() => <h2>Overview</h2>} />
                            <Route path={`/scribe/checkout`} component={Checkout} />
                            <Route path={`/scribe/edit`} render={() => <Editor editorStore={editorStore} />} />
                            <Route path={`/scribe/preview`} render={() => <h2>Preview</h2>} />
                            <Route path={`/scribe/publish`} component={PublishPage} />
                            {/* {match && <Route render={() => <Redirect to={`/scribe/overview`} />} />} */}
                        </Switch>
                    )
                }} />
            )
        }
    }
)

const users = new Collection('users')

export const Checkout = compose(
    inject('store'),
    observer
)(
    class Checkout extends Component {

        render() {
            return (
                <div>
                    {users.docs.map((doc) => (
                        <UserItem key={doc.id} doc={doc} />
                    ))}
                </div>
            )
        }
    }
)

export const UserItem = compose(
    inject('store'),
    observer
)(
    ({ doc }) => {
        const { firstName, lastName, userID } = doc.data
        return (
            <div>
                {`First:_${firstName}_____Last:_${lastName}_____UID:_${userID}`}
            </div>
        )
    }
)

export const Homepage = compose(
    inject('store'),
    observer
)(
    class Homepage extends Component {
        handleFile = event => {
            const file = event.target.files[0];
            this.props.store.scribeStore.createSession(file)
        }

        createNew = () => {
            this.props.store.routing.push('/scribe/Untitled.docx')
        }

        render() {
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

// const ScribeIcon = () => (
//     <SvgIcon viewBox='0 0 512 512' fontSize="small">
//         <path fill="#324a5e" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" />
//     </SvgIcon>
// )