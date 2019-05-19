import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import Palette from '../utils/Palette';

const styles = theme => ({
    root: {
        color: `4px solid ${theme.palette.accent}`,
        maxWidth: 150,
        margin: 8,
        '& button': {
            borderRadius: 20,
            margin: 4,
            padding: 0,
            minWidth: 22,
            maxWidth: 22,
            minHeight: 22,
            maxHeight: 22,
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.5)",
        },
        '& button:hover': {
            border: '2px solid #777777',
        }
    }
});

// Determines how to render children from parent style button and how it should display inside a palette.

const HighlightPalette = (props) => (
    <Palette
        open={props.open}
        anchorEl={props.anchorEl}
        height={50}
        width={165}
        store={props.store}
    >
        <Grid
            className={props.classes.root}
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
        >
            {props.children.map((item, index) => (
                <Grid item key={index}>{item}</Grid>
            ))}
        </Grid>
    </Palette>
)

export default compose(
    withStyles(styles),
    observer
)(HighlightPalette)
