import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';
import Editor from '../Editor/Editor';

export const Scribe = compose(
    inject('store'),
    observer
)(
    class Scribe extends Component {

        handleFile = event => {
            const file = event.target.files[0];
            !!file && this.props.store.scribeStore.createSession(file)
        }

        render() {
            const session = this.props.store.scribeStore.currentSession
            return (
                <div>
                    <h1>Welcome to Scribe!</h1>
                    <input type="file" onChange={this.handleFile} accept=".docx" />
                    <Editor session={session} />
                    <CodeView code={this.props.store.scribeStore.currentSession.code} />
                </div>
            )
        }
    }
)

const CodeView = observer(({ code }) => (
    <p>{code}</p>
))