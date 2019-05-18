import React, { Component } from 'react';
import BlockStyleButton from '../utils/BlockStyleButton';
import Icon from 'mdi-material-ui/FormatListCheckbox'

export default class CheckListButton extends Component {
    render() {
        return (
            <BlockStyleButton {...this.props} blockType={'check-list-item'} name={'Check List Button'} >
                <Icon />
            </BlockStyleButton>
        );
    }
}

