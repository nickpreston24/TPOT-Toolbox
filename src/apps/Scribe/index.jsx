import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import Editor from '../Editor/Editor';
import { PublishPage } from './views/PublishPage';
import { Route, Switch, Redirect } from 'react-router-dom'
import { Collection } from 'firestorter';
import { CheckoutPage } from './views/CheckoutPage'

export const Scribe = compose(
    inject('store'),
    observer
)(
    class Scribe extends Component {

        render() {
            const { match, location, store } = this.props
            const { scribeStore } = store
            const { session } = scribeStore
            const { editorStore } = session
            return (
                <Switch location={location}>
                    <Route exact path={`${match.path}`} render={() => <h2>Welcome to Scribe!</h2>} />
                    <Route path={`${match.path}/overview`} render={() => <h2>Overview</h2>} />
                    <Route path={`${match.path}/checkout`} component={CheckoutPage} />
                    <Route path={`${match.path}/edit`} render={() => <Editor editorStore={editorStore} />} />
                    <Route path={`${match.path}/preview`} render={() => <h2>Preview</h2>} />
                    <Route path={`${match.path}/publish`} component={PublishPage} />
                    {match && <Route render={() => <Redirect to={`${match.path}/overview`} />} />}
                </Switch>
            )
        }
    }
)


// const ScribeIcon = () => (
//     <SvgIcon viewBox='0 0 512 512' fontSize="small">
//         <path fill="#324a5e" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" />
//     </SvgIcon>
// )