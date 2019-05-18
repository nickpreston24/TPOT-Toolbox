import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        // border: `1px solid orangered`,
        boxSizing: 'border-box',
        position: 'absolute',
        zIndex: 0,
        // top: 'calc(50vh + 35px)',
        // left: 'calc(50vh + 260px)',
        transform: 'translate(-50%, -50%)',
        background: `${theme.palette.background.default}`,
        // transformOrigin: '',
        // flex: 1
        // height: '100%',
        // width: '100%',
        // height: 100,
        // width: 100,
        // height: '100vh',
        minHeight: 'calc(100vh - 74px)',
        minWidth: 'calc(100vw - 259px)',
        maxHeight: 'calc(100vh - 75px)',
        maxWidth: 'calc(100vw - 260px)',
        // boxShadow: '0px 30px 50px rgba(204, 197, 185, 0.7)',
        // background: 'grey',
        // minHeight: '100vh',
        // maxHeight: '100vh',
        // minWidth: '100vw',
        // maxWidth: '100vw',
        overflowX: 'hidden',
        overflowY: 'scroll',
        // display: 'flex',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
    },
});

export const Screen =
    withStyles(styles)(
        observer(
            ({ children, classes, id }) =>
                <div id={id} className={classes.root}>{children}</div>
        )
    )

