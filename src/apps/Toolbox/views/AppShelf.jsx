import React, { Fragment, Component } from 'react'
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { compose } from 'recompose'
import { ShelfButton } from './ShelfButton';
import { SvgIcon } from '@material-ui/core';
import { width } from '@material-ui/system';

const styles = theme => ({
    root: {
        // color: 'red',
    },
})

@inject('store')
@withStyles(styles)
@observer
export class AppShelf extends Component {

    @observable expanded = false

    @action expand = () => {
        this.expanded = !this.expanded
    }

    @action expand = () => {
        this.expanded = !this.expanded
    }

    render() {
        const { store, classes, variant, children } = this.props
        const { expanded } = this
        return (
            <Box
                minWidth={expanded === true ? 160 : 72}
                maxWidth={expanded === true ? 160 : 72}
                bgcolor="#202225" py={1}
                display="flex" flexDirection="column" justifyContent="space-between" style={{
                    position: 'relative', boxSizing: 'border-box', height: '100%', width: '100%'
                }}
            >
                {/* <Box bgcolor="red">top</Box>
                <Box bgcolor="blue">mid</Box>
                <Box bgcolor="green">end</Box> */}
                <ShelfButton tooltip="Expand" onClick={this.expand}>
                    <ToolboxSVG />
                </ShelfButton>
               <Divider />
                <Box flexGrow={1}>
                    {children}
                </Box>
                <Divider />
                <ShelfButton tooltip="Settings" onClick={this.expand}>
                    <ToolboxSVG />
                </ShelfButton>
            </Box>
        )
    }
}

{/* <Box display="flex" flexDirection="row" justifyContent="stretch" alignItems="stretch" style={{
    position: 'absolute', boxSizing: 'border-box', height: '100%', width: '100%'
}}>
    <Box flexGrow={1} display="flex" flexGrow={1} >
        <Box minWidth={72} bgcolor="#202225">
            {appShelf}
        </Box>
        <Box bgcolor="#2f3136" width={240} color="primary.main">{this.sidebar && <> {this.sidebar} </> }</Box>
        <Box flexGrow={1} bgcolor="#f6f6f7" color="secondary.main">
            <Box color="accents.pink">
                <Button color="inherit">Test Button</Button>
            </Box>
        </Box>
    </Box>
</Box> */}

const ToolboxSVG = () => (
    <SvgIcon >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
)

const Divider = () => (
    <Box width='100%' display="flex" justifyContent="center">
        <Box height={2} width={32} my={'4px'} borderRadius={2} bgcolor="#2f3136"/>
    </Box>

)
