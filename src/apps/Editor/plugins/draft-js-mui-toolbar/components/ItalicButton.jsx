import React, { Component } from 'react';
import InlineStyleButton from '../utils/InlineStyleButton';
import Icon from 'mdi-material-ui/FormatItalic'

export default class BoldButton extends Component {
    render() {
        return (
            <InlineStyleButton {...this.props} styleType={'ITALIC'} name={'Italic Button'} >
                <Icon />
            </InlineStyleButton>
        );
    }
}

