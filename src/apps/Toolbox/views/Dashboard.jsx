import React, { Fragment, Component } from 'react'
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { compose } from 'recompose'
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        // color: 'red',
    },
})

@inject('store')
@withStyles(styles)
@observer
export class Dashboard extends Component {

    render() {
        const { store, classes, variant, expanded, appShelf } = this.props
        return (
                <Box display="flex" flexDirection="row" justifyContent="stretch" alignItems="stretch" style={{
                    position: 'absolute', boxSizing: 'border-box', height: '100%', width: '100%'
                }}>
                    <Box flexGrow={1} display="flex" >
                        <Box width={72} bgcolor="#202225"  >
                            {appShelf}
                        </Box>
                        <Box bgcolor="#2f3136" width={240} color="primary.main">{this.sidebar && <> {this.sidebar} </> }</Box>
                        <Box flexGrow={1} bgcolor="#f6f6f7" color="secondary.main">
                            <Box color="accents.pink">
                                <Button color="inherit">Test Button</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
        )
    }
}
