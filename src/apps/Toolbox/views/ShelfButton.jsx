import React, { Fragment, Component } from 'react'
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { compose } from 'recompose'
import SvgIcon from '@material-ui/core/SvgIcon';
import { Button, Tooltip, Zoom } from '@material-ui/core';


const styles = theme => ({
    root: {
        // border: '1px solid black',
        // color: 'red !important',
        // background: 'red !important',
        // #292b2f
        
        '& Button': {
            background: '#292b2f',
            borderRadius: '50%',
            color: 'white',
            minWidth: 48,
            height: 48,
            width: 48,
            marginLeft: 8,
            marginRight: 12,
            marginTop: 4,
            marginBottom: 4,
            transition: 'all 300ms ease-in-out',
            '& svg': {
                fill: '#7289da',
            },
            '& img': {
                height: 24,
                width: 24,
                marginBottom: 6,
            }
        },
        '& .indicator': {
            background: 'white',
            marginRight: 4,
            height: 0,
            width: 0,
            borderRadius: '0px 4px 4px 0px',
            transition: 'all 300ms ease-in-out',
        },
        '&:hover': {
            '& Button': {
                borderRadius: 16,
                background: '#7289da',
                transition: 'border-radius 300ms ease-in-out, background 200ms ease-in-out',
                '& svg': {
                    fill: 'white',
                }
            },
            '& .indicator': {
                marginRight: 0,
                height: 20,
                width: 4,
                transition: 'all 300ms ease-in-out',
            }
        },
    },
    popper: {
        fontSize: '80px !important'
    }
})

@inject('store')
@withStyles(styles)
@observer
export class ShelfButton extends Component {

    render() {
        const { store, classes, variant, expanded, tooltip, children, onClick, color } = this.props
        return (
            <Box bgcolor="grey" className={classes.root} display="flex" alignItems="center">
                <span className='indicator' />
                <Tooltip title={tooltip ? tooltip : 'Tooltip'} placement="right" transitionComponent={Zoom} style={{fontSize: '40px !important'}}
                    classes={{popper: classes.popper}}
                >
                    <Button className={classes.button} onClick={onClick} style={color && {background: color}}>
                        {children ? children : <DefaultIcon />}
                    </Button>
                </Tooltip>
            </Box>
        )
    }
}

const DefaultIcon = () => (
    <SvgIcon >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
)
