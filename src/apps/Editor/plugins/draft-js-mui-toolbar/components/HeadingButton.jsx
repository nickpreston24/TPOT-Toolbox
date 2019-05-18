import React, { Component } from 'react';
import BlockStyleButton from '../utils/BlockStyleButton';
import Icon from 'mdi-material-ui/FormatSize'

export default class HeadingButton extends Component {
    render() {
        return (
            <BlockStyleButton {...this.props} blockType={'header-four'} name={'Heading Button'} >
                <Icon />
            </BlockStyleButton>
        );
    }
}