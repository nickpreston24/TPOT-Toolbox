import React, { Component } from 'react'
import PropTypes from "prop-types";
import { compose } from 'recompose'
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { ShelfButton } from './ShelfButton';
import { SvgIcon, Avatar, Button } from '@material-ui/core';
import { width } from '@material-ui/system';

const styles = theme => ({
    root: {
        transition: 'all 220ms ease-in-out'
    },
    title: {
        boxShadow: "0 1px 0 rgba(32,34,37,.7), 0 2px 0 rgba(0,0,0,.06)",
    },
})

const menu = [
    {
        name: 'save',
        icon: '',
        action: '',
    },
    {
        name: 'load',
        icon: '',
        action: '',
    },
    {
        name: 'publish',
        icon: '',
        action: '',
    },
    {
        name: 'preview',
        icon: '',
        action: '',
    },
    {
        name: 'clear',
        icon: '',
        action: '',
    },
]

export const Sidebar = compose(
    inject('store'),
    withStyles(styles),
    observer
)(
    class Sidebar extends Component {

        render() {
            const { store, classes, variant, children, expanded } = this.props
            console.log(menu)
            console.log(menu[0].name)
            return (
                <Box bgcolor="#2f3136" width={240} height='100%' >
                    <Box className={classes.title} height={48} color="white" display="flex" alignItems="center" fontSize={20} mx={1}>
                        <Box mx={2} display="flex" alignItems="center" color="#aaabad" >
                            <ScribeIcon />
                        </Box>
                        Scribe
                    </Box>
                    {menu.map((item) => (
                        <Box >
                            <Button>{item.name}</Button>
                        </Box>
                    ))}
                </Box>
            )
        }
    }
)

Sidebar.propTypes = {
    store: PropTypes.object.isRequired,
}

const ScribeIcon = () => (
    <SvgIcon viewBox='0 0 512 512'>
        <path d="M71.46 287.61c-4.85 41.95-7.25 84.14-7.38 126.37L7.03 471.03c-9.37 9.37-9.37 24.57 0 33.94 9.37 9.37 24.57 9.37 33.94 0l57.05-57.05c42.23-.12 84.42-2.53 126.37-7.38C473.8 415.14 508.44 51.72 512 0 460.28 3.56 96.87 38.2 71.46 287.61zm147.42 105.25c-23.41 2.71-47.3 4.36-71.31 5.51L193.94 352h125.37c-27.89 21.72-60.89 36.83-100.43 40.86zM352.81 320H225.94l64-64h106.12c-12.11 23.11-26.54 44.76-43.25 64zm-30.87-96l13.54-13.54c9.37-9.37 9.37-24.57 0-33.94-9.37-9.37-24.57-9.37-33.94 0l-187.9 187.9c1.16-24.09 2.83-48.13 5.58-71.96C136.33 124.4 349.77 70.87 457.48 54.51c-6.89 45.3-20.53 109.25-46.37 169.49h-89.17z" />
    </SvgIcon>
)

const FileIcon = () => (
    <SvgIcon viewBox='0 0 512 512'>
        <path d="M71.46 287.61c-4.85 41.95-7.25 84.14-7.38 126.37L7.03 471.03c-9.37 9.37-9.37 24.57 0 33.94 9.37 9.37 24.57 9.37 33.94 0l57.05-57.05c42.23-.12 84.42-2.53 126.37-7.38C473.8 415.14 508.44 51.72 512 0 460.28 3.56 96.87 38.2 71.46 287.61zm147.42 105.25c-23.41 2.71-47.3 4.36-71.31 5.51L193.94 352h125.37c-27.89 21.72-60.89 36.83-100.43 40.86zM352.81 320H225.94l64-64h106.12c-12.11 23.11-26.54 44.76-43.25 64zm-30.87-96l13.54-13.54c9.37-9.37 9.37-24.57 0-33.94-9.37-9.37-24.57-9.37-33.94 0l-187.9 187.9c1.16-24.09 2.83-48.13 5.58-71.96C136.33 124.4 349.77 70.87 457.48 54.51c-6.89 45.3-20.53 109.25-46.37 169.49h-89.17z" />
    </SvgIcon>
)