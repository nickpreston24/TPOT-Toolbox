import { CircularProgress, withStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';

const styles = theme => ({
    root: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translateXY(-50% -50%)',
        color: theme.palette.text.secondary
    }
})

export const Loading =
    withStyles(styles)(
        observer(
            ({ classes }) => (
                <CircularProgress
                disableShrink
                    className={classes.root}
                />
            )
        )
    )