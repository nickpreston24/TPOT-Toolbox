import React, { Component } from 'react';
import BlockAlignmentButton from '../utils/BlockAlignmentButton';
import Icon from 'mdi-material-ui/FormatAlignCenter'

export default class AlignCenterButton extends Component {
    render() {
        return (
            <BlockAlignmentButton {...this.props} type={'center'} name={'Align Center Button'} >
                <Icon />
            </BlockAlignmentButton>
        );
    }
}

