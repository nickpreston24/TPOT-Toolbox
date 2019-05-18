import React, { Component } from 'react';
import BlockAlignmentButton from '../utils/BlockAlignmentButton';
import Icon from 'mdi-material-ui/FormatAlignLeft'

export default class AlignLeftButton extends Component {
    render() {
        return (
            <BlockAlignmentButton {...this.props} type={'left'} name={'Align Left Button'} >
                <Icon />
            </BlockAlignmentButton>
        );
    }
}

