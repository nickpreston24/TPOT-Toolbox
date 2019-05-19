import { Collapse } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import PlusIcon from 'mdi-material-ui/Plus';
import CloseIcon from 'mdi-material-ui/WindowClose';
import { action, decorate, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from "react";
import { compose } from 'recompose';
import AlignCenterButton from './AlignCenterButton';
import AlignLeftButton from './AlignLeftButton';
import AlignRightButton from './AlignRightButton';
import BoldButton from './BoldButton';
import CheckListButton from './CheckListButton';
import OrderedListButton from './OrderedListButton';
import PageBreakButton from './PageBreakButton';
import UnorderedListButton from './UnorderedListButton';

const styles = theme => ({
    root: {
        position: "absolute",
        // display: "block",
        // visibility: "visible",
        // transform: 'translate(-50%) scale(0)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        // background: theme.palette.secondary.dark,
        // background: '#e5e9ec',
        // background: 'dodgerblue',
        // background: '#444861',
        borderRadius: 20,
        // minWidth: 30,
        // maxWidth: 30,
        minHeight: 30,
        maxHeight: 30,
        overflow: 'show',
        // border: '1px solid red'
    },
    plus: {
        transform: 'translateX(5px)',
        color: theme.palette.secondary.textDark,
        minWidth: 30,
        maxWidth: 30,
        minHeight: 30,
        maxHeight: 30,
        
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
        background: 'dodgerblue',
        borderRadius: 20,
        padding: '1px',
        '& *': {
            color: 'white',
            fontSize: 20,
        }
    },
    container: {
        // border: '2px solid green',
        marginTop: 8,
        background: '#f5f5f5',
        width: 40,
        transition: 'width 0.8s cubic-bezier(.3,1.2,.2,1)',
        overflow: 'hidden',
        borderRadius: 20,
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",

    },
    entered: {
        // border: '2px solid red',
        display: 'flex',
        width: 120,
        minHeight: 30,
        maxHeight: 30,
        transition: 'width 0.8s cubic-bezier(.3,1.2,.2,1)',
        overflow: 'hidden',
        borderRadius: 20
    },
    wrapper: {
        // border: '2px solid blue',
    },
    wrapperInner: {
        // border: '2px solid magenta',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        // background: 'grey',
        '& *': {
            display: 'flex',
            // minWidth: 30,
            // maxWidth: 30,
            // minHeight: 0,
            // maxHeight: 30,
            // padding: '1px',
            '& button': {
                // border: '2px solid blue',
                color: '#777777',
                // color: 'white',
                fontSize: 24,
            }
        }
    },
});

class MuiToolbar extends Component {

    expanded = false

    handleMouseClick = () => {
        this.expanded = !this.expanded
    }

    // handleMouseHover = () => {
    //     if(this.expanded) {
    //         let collapse = setTimeout(action(() => { 
    //             if(this.expanded) {
    //                 this.expanded = false
    //             }
    //         }), 1500);
    //     } else {
    //         this.expanded = true
    //     }
    // }

    handleCollapseRef = (element) => {
        this.menu = element
    }

    render() {
        let { classes, store, childProps } = this.props;
        childProps = {
            ...childProps,
            variant: 'light'
        }

        return (
            <Fragment>
                {store.blockVisible &&
                    <div className={classes.root} ref={this.handleCollapseRef} style={store.blockOffset} >
                        <IconButton className={classes.plus} onClick={this.handleMouseClick}>
                            {!this.expanded ? <PlusIcon /> : <CloseIcon />}
                        </IconButton>
                        <Collapse in={this.expanded} onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} style={{ borderRadius: 20 }}>
                            <CollapseSide classes={classes}>
                                <BoldButton {...childProps} />
                                <AlignCenterButton {...childProps} />
                                <AlignRightButton {...childProps} />
                            </CollapseSide>
                            <CollapseSide classes={classes}>
                                <PageBreakButton {...childProps} />
                            </CollapseSide>
                            <CollapseSide classes={classes}>
                                <AlignLeftButton {...childProps} />
                                <AlignCenterButton {...childProps} />
                                <AlignRightButton {...childProps} />
                            </CollapseSide>
                            <CollapseSide classes={classes}>
                                <OrderedListButton {...childProps} />
                                <UnorderedListButton {...childProps} />
                                <CheckListButton {...childProps} />
                            </CollapseSide>
                        </Collapse>
                    </div>
                }
            </Fragment>
        )
    }

}

MuiToolbar.propTypes = {
    store: PropTypes.object.isRequired,
};



export default compose(
    // inject('store'),
    withStyles(styles),
    observer
)(decorate(
    MuiToolbar, {
        expanded: observable,
        handleMouseClick: action,
        handleMouseHover: action,
    }))

class CollapseSide extends Component {

    hover = false

    handleMouseHover = () => {
        if(this.hover) {
            // let collapse = setTimeout(action(() => { 
            //     if(this.hover) {
            //         this.hover = false
            //     }
            // }), 0);
        } else {
            this.hover = true
        }
    }

    render() {
        const { children, classes } = this.props

        return (
            <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} >
                <Collapse in={this.hover} collapsedHeight="40px"
                    classes={{
                        container: classes.container,
                        entered: classes.entered,
                        wrapper: classes.wrapper,
                        wrapperInner: classes.wrapperInner
                    }}
                >
                    {children}
                </Collapse>
            </div>
        )
    }

}

compose(
    observer
)(decorate(
    CollapseSide, {
        hover: observable,
        handleMouseHover: action
    }))