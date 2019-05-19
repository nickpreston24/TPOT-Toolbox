import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        padding: 0,
        minWidth: 40,
        maxWidth: 40,
        minHeight: 40,
        maxHeight: 40,
        overflow: 'visible',
        color: `4px solid ${theme.palette.accent}`
    }
});

const ButtonPlus = (props) => {
    return (
        <Button {...props}>
            <Fragment>
                {props.children}
            </Fragment>
        </Button>
    )
}

export default compose(
    withStyles(styles),
    observer
)(ButtonPlus)
