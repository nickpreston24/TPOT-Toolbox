import React, { Component } from 'react';
import InlineStyleButton from '../utils/InlineStyleButton';
import Icon from 'mdi-material-ui/FormatBold'

export default class BoldButton extends Component {
    render() {
        return (
            <InlineStyleButton {...this.props} styleType={'BOLD'} name={'Bold Button'} >
                <Icon />
            </InlineStyleButton>
        );
    }
}

