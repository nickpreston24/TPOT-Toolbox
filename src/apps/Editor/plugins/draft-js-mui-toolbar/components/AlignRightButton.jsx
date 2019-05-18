import React, { Component } from 'react';
import BlockAlignmentButton from '../utils/BlockAlignmentButton';
import Icon from 'mdi-material-ui/FormatAlignRight'

export default class AlignRightButton extends Component {
    render() {
        return (
            <BlockAlignmentButton {...this.props} type={'right'} name={'Align Right Button'} >
                <Icon />
            </BlockAlignmentButton>
        );
    }
}

