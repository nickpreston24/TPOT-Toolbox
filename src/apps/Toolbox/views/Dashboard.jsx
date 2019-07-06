import React, { Fragment, Component } from 'react'
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { compose, withProps } from 'recompose'
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        // color: 'red',
    },
    header: {
        height: 48,
        background: "white",
        boxShadow: "0 1px 0 rgba(0,0,0,.1), 0 1.5px 0 rgba(0,0,0,.025), 0 2px 0 rgba(0,0,0,.025)",
    },
    currentApp: {
        overflowY: 'scroll',
        overflowX: 'hidden',
    },
    '@global': {
        '*::-webkit-scrollbar': {
            height: 14,
            width: 16,
        },
        '*::-webkit-scrollbar-thumb': {
            boxShadow: 'inset 0 0 10px 10px #7289da',
            border: '4px transparent solid',
            borderRadius: 12,
        },
    }
})

@inject('store')
@withStyles(styles)
@observer
export class Dashboard extends Component {

    @observable expanded = false

    @action expand = () => {
        this.expanded = !this.expanded
    }

    render() {
        const { store, classes, variant, shelf, sidebar, header, currentApp } = this.props
        return (
            <Box flexGrow={2} display="flex" flexDirection="row" justifyContent="flex-start">
                <Box width={72} bgcolor="#202225"  >
                    {shelf}
                </Box>
                <Box bgcolor="#2f3136" width={240} color="primary.main">
                    {sidebar}
                </Box>
                <Box flexGrow={1} bgcolor="#f6f6f7" display="flex" flexDirection="column">
                    <Box className={classes.header} px={1} display="flex" alignItems="center" justifyContent="flex-end" color="accent.pink">
                        {header}
                        <Button color="inherit">Test Button</Button>
                    </Box>
                    <Box className={classes.currentApp} flexGrow={1} id="CurrentApp">
                        {currentApp}
                        <div style={{ height: '600%' }} />
                    </Box>
                </Box>
            </Box>
        )
    }
}
