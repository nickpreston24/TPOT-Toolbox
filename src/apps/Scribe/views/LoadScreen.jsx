import React, { Fragment, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { compose } from 'recompose'
import { RoutedModal } from '../../Toolbox/views/RoutedModal'
import { BrowserRouter, Link, Route, Redirect, Switch, withRouter } from 'react-router-dom'


const styles = theme => ({
    root: {
        // color: 'red',
    },
})

export const LoadScreen = compose(
    inject('store'),
    withStyles(styles),
    observer
)(
    class LoadScreen extends Component {

        @observable open = true

        @action toggle = () =>
            this.open = !this.open

        render() {
            const { store, classes, match, history, base, path } = this.props
            const { toggle, open } = this
//            console.log('MAZ', this.props)
//            console.log(`${match.path}${path}`)
            return (
                <RoutedModal>
                    <Route exact path={`${match.path}${path}`} render={()=> <h1>Test Modal</h1>} />
                </RoutedModal>
            )
        }
    }
)
