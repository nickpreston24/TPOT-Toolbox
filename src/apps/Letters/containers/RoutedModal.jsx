import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { compose } from 'recompose'
import { Dialog } from '@material-ui/core';
import { Route, withRouter } from 'react-router-dom'
import Acrylic from 'react-acrylic'


const styles = theme => ({
    root: {
        // border: '2px solid blue',
        height: 'calc(100% - 75px)',
        width: 'calc(100% - 260px)',
        // pointerEvents: 'none',
        position: 'absolute',
        zIndex: 1,
        top: 'unset',
        left: 'unset',
        bottom: 0,
        right: 0,
    },
    backdrop: {
        height: '100%',
        width: '100%',
        background: 'rgba(255, 0, 0, 0.38)',
        position: 'absolute'
    },
    container: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
    },
    paper: {
        boxShadow: 'none',
        border: '1px solid blue'
    }
})

class RoutedModalClass extends Component {

    @observable open = true

    @action toggle = () =>
        this.open = !this.open

    render() {
        const { store, classes, relPath, component, path, match, location, history } = this.props
        const { toggle, open } = this
        console.table(match)
        return (
            // <h1>test</h1>
            <Route path={`${match.path}${relPath}`} render={() => {
                return (
                    <Dialog
                        // style={{height: '100%', width: '100%', background: 'grey', position: 'absolute', zIndex: 1, border: '2px solid blue'}}
                        // height: 'calc(100% - 75px)',
                        // width: 'calc(100% - 260px)',
                        // pointerEvents: 'none',
                        // position: 'absolute',
                        // zIndex: 1,
                        classes={{
                            root: classes.root,
                            container: classes.container,
                            paper: classes.paper,
                            backdrop: classes.backdrop,
                        }}
                        BackdropComponent={BackdropComponent}
                        onBackdropClick={() => console.log('away')}
                        disablePortal
                        open={true}
                    >
                        Content
                    </Dialog>
                )
            }} />
        )
    }
}

export const RoutedModal = compose(
    inject('store'),
    withStyles(styles),
    withRouter,
    observer
)(RoutedModalClass)

export const BackdropComponent = compose(
    withStyles(styles),
    observer
)(({ classes, children }) => {
    return (
        <div className={classes.backdrop}>
            <Acrylic
                onClick={() => console.log('away')}
                colorOverlay='#eee'
                opacity='0.05'

                position='absolute'
                top='0px'
                left='0px'
                width='100%'
                height='100%'
                className={classes.backdrop}

                blur={10}
                borderRadius='2px'
                borderRadius='2px'
            >
                {children}
            </Acrylic>
        </div>
    )
})
