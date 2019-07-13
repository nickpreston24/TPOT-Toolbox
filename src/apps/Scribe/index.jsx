import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject } from 'mobx-react';
import Editor from '../Editor/Editor';

export const Scribe = compose(
    inject('store')
)(
    class Scribe extends Component {

        handleFile = event => {
            const file = event.target.files[0];
            console.log('File blob: ', file)
            console.log(this.props.store)
            this.props.store.scribeStore.createSession(file)
        }

        render() {
            const session = this.props.store.scribeStore.currentSession
            const store = session.editorStore
            console.log('code', session.code)
            console.log('tty', this.props.store.scribeStore.currentSession.editorStore)
            return (
                <div>
                    <h1>Welcome to Scribe!</h1>
                    <input type="file" onChange={this.handleFile} accept=".docx" />
                    <Editor session={session} />
                    <p>{this.props.store.scribeStore.currentSession.code}</p>
                </div>
            )
        }
    }
)