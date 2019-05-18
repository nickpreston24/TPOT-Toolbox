import React, { Component } from 'react';
import BlockStyleButton from '../utils/BlockStyleButton';
import Icon from 'mdi-material-ui/FormatListBulleted'

export default class UnorderedListButton extends Component {
    render() {
        return (
            <BlockStyleButton {...this.props} blockType={'unordered-list-item'} name={'Unordered List Button'} >
                <Icon />
            </BlockStyleButton>
        );
    }
}

