import React, { Component } from 'react'
import PropTypes from "prop-types";
import { compose } from 'recompose'
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import SvgIcon from '@material-ui/core/SvgIcon';
import { Button, Tooltip, Zoom } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { Shelf } from './Shelf';



const styles = theme => ({
    root: {
        '& Button ': {
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
                fontSize: 24,
                fill: '#7289da',
            },
            '& img': {
                height: 32,
                width: 32,
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

// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
const LinkAdapter = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} ><Button>{props.children}</Button></Link>)

export const ShelfButton = compose(
    inject('store'),
    withStyles(styles),
    observer
)(
    class ShelfButton extends Component {

        render() {
            const { store, classes, variant, expanded, tooltip, children, onClick, color, icon, path } = this.props
            return (
                <Box bgcolor="grey" className={classes.root} display="flex" alignItems="center">
                    <span className='indicator' />
                    <Tooltip title={tooltip ? tooltip : 'Tooltip'} placement="right" transitionComponent={Zoom} style={{ fontSize: '40px !important' }}
                        classes={{ popper: classes.popper }}
                    >
                        {path
                            ? <Button component={LinkAdapter} to={path}  className={classes.button}>
                                {icon === 'scribe' ? <ScribeIcon /> : children}
                            </Button>
                            : <Button className={classes.button} style={color && { background: color }}>
                                {icon === 'scribe' ? <ScribeIcon /> : children}
                            </Button>
                        }
                    </Tooltip>
                </Box>
            )
        }
    }
)

ShelfButton.propTypes = {
    store: PropTypes.object.isRequired,
}

const ScribeIcon = () => (
    <SvgIcon viewBox='0 0 512 512'>
        <path fill="#324a5e" d="M71.46 287.61c-4.85 41.95-7.25 84.14-7.38 126.37L7.03 471.03c-9.37 9.37-9.37 24.57 0 33.94 9.37 9.37 24.57 9.37 33.94 0l57.05-57.05c42.23-.12 84.42-2.53 126.37-7.38C473.8 415.14 508.44 51.72 512 0 460.28 3.56 96.87 38.2 71.46 287.61zm147.42 105.25c-23.41 2.71-47.3 4.36-71.31 5.51L193.94 352h125.37c-27.89 21.72-60.89 36.83-100.43 40.86zM352.81 320H225.94l64-64h106.12c-12.11 23.11-26.54 44.76-43.25 64zm-30.87-96l13.54-13.54c9.37-9.37 9.37-24.57 0-33.94-9.37-9.37-24.57-9.37-33.94 0l-187.9 187.9c1.16-24.09 2.83-48.13 5.58-71.96C136.33 124.4 349.77 70.87 457.48 54.51c-6.89 45.3-20.53 109.25-46.37 169.49h-89.17z" />
    </SvgIcon>
)
