import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import PublishScreen from '../views/PublishScreen';

class PublishScreenContainer extends Component {
    state = {
        // Properties...
    }

    render() {
        let { lettersStore: store, ...rest } = this.props
        let editorCode = this.props.editorStore.editorCode
        
        return (
            <Fragment>
                <PublishScreen comments={store.publishData} store={store} editorCode={editorCode} {...rest} />
            </Fragment>
        )
    }
}

export default compose(
    inject('lettersStore', 'editorStore'),
    observer
)(PublishScreenContainer)