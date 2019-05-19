import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = theme => ({
    root: {
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#f5f5f5',
        height: 80,
        width: 80,
        display: 'block',
        zIndex: 30,
        borderTop: '6px solid #373940',
        borderRadius: 6,
    },
    carrot: {
        position: 'absolute',
        top: 0,
        left: 0,
        maxHeight: 10,
        maxWidth: 20,
        zIndex: 31,
    }
});

class Palette extends Component {

    handleClickAway = () => {
        this.props.store.setStyleProp('menuOpen', false)
    };

    isVisible = () => {
        if (!!this.props.anchorEl && !!this.props.store.menuCurrent) {
            return this.props.anchorEl.id === this.props.store.menuCurrent.id
        }
    }

    getStyle = () => {
        if (!!this.props.anchorEl) {
            const left = this.props.anchorEl.offsetLeft
            const fullWidth = this.props.width
            const halfWidth = fullWidth / 2
            const buttonHalf = this.props.anchorEl.clientWidth / 2
            const container = 400
            const buffer = 20
            const padding = 6
            const knurl = 4
            return {
                top: this.props.anchorEl.offsetHeight + padding + knurl,
                left: (left < halfWidth) ? buffer : (left > container - fullWidth + buttonHalf) ? (container - fullWidth - buffer) : (left - halfWidth + buttonHalf),
                height: this.props.height,
                width: this.props.width,
                carrotTop: this.props.anchorEl.offsetHeight + knurl - 1,
                carrotLeft: left + buttonHalf / 2,
            }
        }
    }

    render() {
        const { handleClickAway } = this
        const { classes, children, store } = this.props
        console.log('MENUS', this.props, store)
        const { menuOpen } = store
        const style = this.getStyle()
        const carrotStyle = !!style && { top: style.carrotTop, left: style.carrotLeft }
        return (
            <Fragment>
                {(menuOpen && this.isVisible()) &&
                    <ClickAwayListener onClickAway={handleClickAway} >
                        <>
                            <div className={classes.root} style={style}>
                                {children}
                            </div>
                            <svg className={classes.carrot} style={carrotStyle} xmlns="http://www.w3.org/2000/svg">
                                <path id="splash" fill={'#373940'} d="M 10 0 L 20 10 L 0 10 " />
                            </svg>
                        </>
                    </ClickAwayListener>
                }
            </Fragment>

        )
    }
}

export default compose(
    // inject('store'),
    withStyles(styles),
    observer
)(Palette)
