import React, { Component } from 'react';
import BlockStyleButton from '../utils/BlockStyleButton';
import Icon from 'mdi-material-ui/FormatListNumbered'

export default class OrderedListButton extends Component {
    render() {
        return (
            <BlockStyleButton {...this.props} blockType={'ordered-list-item'} name={'Ordered List Button'} >
                <Icon />
            </BlockStyleButton>
        );
    }
}

