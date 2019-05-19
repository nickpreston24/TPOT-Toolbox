import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { inject, observer } from "mobx-react";
import React, { Component } from 'react';
import { compose } from "recompose";
import ButtonPlus from './ButtonPlus';

const MuiStyles = theme => ({
    root: {
        color: theme.palette.secondary.textDark,
    },
    active: {
        color: theme.palette.accent,
        fill: theme.palette.accent,
    }
});

class CustomStyleButton extends Component {

    state = {
        anchorEl: null,
        paletteOpen: false,
        ref: null,
    };

    preventBubblingUp = (event) => { event.preventDefault(); }

    toggleStyle = async (event, value) => {
        event.preventDefault();

        const PREFIX = this.props.customStylePrefix
        const CUSTOM_PROP = this.props.customType
        const CUSTOM_NAME = `${PREFIX}${CUSTOM_PROP.toUpperCase()}_${value}`
        const CUSTOM_ATTRB = `${value}`
        
        console.log('CAT' , this.props)

        const customStyleMap = JSON.parse(JSON.stringify(this.props.store.editorStore.baseStyleMap))
        // Update the style map with the new custom style before you try to apply the class with customStyleFunctions[property-name].toggle()
        const STYLE_MAP = Object.assign(customStyleMap, { [`${CUSTOM_NAME}`]: { [`${CUSTOM_PROP}`]: CUSTOM_ATTRB } })
        // await this.props.getEditorProps().setStyleMap(STYLE_MAP)
        this.props.store.editorStore.setStyleMap(STYLE_MAP)

        // Toggle the style using the attribute name (ex:  #FF0099, 24PX, LIME, etc.)
        this.props.setEditorState(
            this.props.customStyleFunctions[`${CUSTOM_PROP}`].toggle(
                this.props.getEditorState(),
                CUSTOM_ATTRB.toUpperCase()
            )
        );

        this.props.store.setStyleProp('menuOpen', false)

    }

    handleParentButton = (event) => {
        this.props.store.setStyleProp('menuCurrent', this.state.anchorEl)
        this.props.store.setStyleProp('menuOpen', true)
    };

    handleRef = (element) => {
        this.setState({ anchorEl: element })
    }

    handleClose = () => {
        this.setState({ paletteOpen: false })
    }

    // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
    styleIsActive = (key) => this.props.getEditorState && !!this.props.paletteItems && this.props.getEditorState().getCurrentInlineStyle().has(`${this.props.customStylePrefix}${this.props.customType.toUpperCase()}_${this.props.paletteItems[key].toUpperCase()}`)

    render() {
        const { classes, name } = this.props;
        const Palette = this.props.palette

        return (
            <div id={name} onMouseDown={this.preventBubblingUp} ref={this.handleRef} >
                {/* If this is a single function button */}
                <ButtonPlus
                    className={classNames(classes.root, this.styleIsActive(0) && classes.active)}
                    children={this.props.children}
                    onClick={this.handleParentButton}

                >{this.props.children}</ButtonPlus>

                {/* If this is a multi-function palette-opening button */}
                {this.props.palette &&
                    <Palette anchorEl={this.state.anchorEl} >
                        {this.props.paletteItems.map((swatch, index) => {
                            return (
                                <ButtonPlus key={index} onClick={(e)=> this.toggleStyle(e, swatch)} style={{background: swatch, color: this.styleIsActive(index) && 'dodgerblue'}}></ButtonPlus>
                            );
                        })}
                    </Palette>
                }
            </div>
        );
    }
}

export default compose(
    inject( 'editorStore','store'),
    withStyles(MuiStyles),
    observer
)(CustomStyleButton);