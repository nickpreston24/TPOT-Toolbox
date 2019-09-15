import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from "recompose";
import { withSnackbar, SnackbarProvider } from 'notistack';
import { inject, observer } from "mobx-react";
import { Button } from '@material-ui/core'

const styles = {
    root: {
        fontWeight: 500,
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.25)',
    },
    success: { backgroundColor: '#72d67a', color: '#209225' },
    error: { backgroundColor: '#f3815f', color: '#ad250b' },
    warning: { backgroundColor: '#ffd475', color: '#b9800f' },
    info: { backgroundColor: '#6dddff', color: '#1892d0' },
};

const Notifier = ({ classes, store }) => {
    const { notification } = store.lettersStore
    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={2000}
            disableWindowBlurListener
            classes={{
                base: classes.root,
                variantSuccess: classes.success,
                variantError: classes.error,
                variantWarning: classes.warning,
                variantInfo: classes.info,
            }}
        // action={[ <Button color="secondary" size="small"> Alert </Button> ]}
        >
            <Fragment>
                {notification && (< Dispatcher notification={notification} />)}
            </Fragment>
        </SnackbarProvider>
    )
}

const Dispatcher = withSnackbar((props) => {    
    const { enqueueSnackbar, notification } = props
    const data = JSON.parse(notification.data)
    const { message, config } = data
    enqueueSnackbar(message, {
        ...config,
        action: <Button size="small" color="inherit">Dismiss</Button>,
    })
    return null
})

export default compose(
    inject("store"),
    withStyles(styles),
    observer
)(Notifier);