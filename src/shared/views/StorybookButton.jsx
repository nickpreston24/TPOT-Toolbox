import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { compose } from 'recompose'

const styles = theme => ({
    root: {
        // color: 'red',
    },
})

// @inject('store')
@withStyles(styles)
@observer
class StorybookButton extends Component {

    @observable open = true

    @action toggle = () =>
            this.open = !this.open

    render() {
        const { store, classes, task, state, actions } = this.props
//        console.log('actions', this.props)
        const { toggle, open } = this
        return (
            <div className={classes.root}>
                <button onClick={toggle}>{`Storybooks: ${open}`}</button>
                {!!task  && task.name}
                {!!task  && task.state}
            </div>
        )
    }
}

export default StorybookButton
