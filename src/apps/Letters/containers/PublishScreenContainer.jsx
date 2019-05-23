import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import PublishScreen from '../views/PublishScreen';

class PublishScreenContainer extends Component {
    state = {
        // Properties...
    }

    render() {
        let { store, ...rest } = this.props
        const { lettersStore, editorStore } = store
        let editorCode = editorStore.editorCode
        
        return (
            <Fragment>
                <PublishScreen comments={lettersStore.publishData} store={store} editorCode={store.editorStore.editorCode} {...rest} />
            </Fragment>
        )
    }
}

export default compose(
    inject('store'),
    observer
)(PublishScreenContainer)