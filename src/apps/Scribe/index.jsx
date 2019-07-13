import React, { Component } from 'react'
import { compose } from 'recompose'
import { inject } from 'mobx-react';

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
            const code = this.props.store.scribeStore.currentSession.code
            console.log('code', code)
            return (
                <div>
                    <h1>Welcome to Scribe!</h1>
                    <input type="file" onChange={this.handleFile} accept=".docx" />
                    <p>{this.props.store.scribeStore.currentSession.code}</p>
                </div>
            )
        }
    }
)