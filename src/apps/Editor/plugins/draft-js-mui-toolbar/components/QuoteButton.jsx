import React, { Component } from 'react';
import BlockStyleButton from '../utils/BlockStyleButton';
import Icon from 'mdi-material-ui/FormatQuoteClose'

export default class HeadingButton extends Component {
    render() {
        return (
            <BlockStyleButton {...this.props} blockType={'blockquote'} name={'Quote Button'} >
                <Icon />
            </BlockStyleButton>
        );
    }
}

