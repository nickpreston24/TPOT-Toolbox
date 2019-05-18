import React, { Component } from 'react';
import InlineStyleButton from '../utils/InlineStyleButton';
import Icon from 'mdi-material-ui/FormatUnderline'

export default class BoldButton extends Component {
    render() {
        return (
            <InlineStyleButton {...this.props} styleType={'UNDERLINE'} name={'Underline Button'} >
                <Icon />
            </InlineStyleButton>
        );
    }
}

