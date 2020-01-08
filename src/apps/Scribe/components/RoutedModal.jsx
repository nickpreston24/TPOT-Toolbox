import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { compose } from 'recompose'
import { Dialog } from '@material-ui/core';

const styles = theme => ({
    root: {
        // color: 'red',
    },
})

export const RoutedModal = compose(
    inject('store'),
    withStyles(styles),
    observer
)(
    class RoutedModal extends Component {

    @observable open = true

    @action toggle = () => 
            this.open = !this.open

    render() {
        const { store, classes, children } = this.props
        const { toggle, open } = this
        return (
            <Dialog open>
                {children}
            </Dialog>
        )
    }
}
)
