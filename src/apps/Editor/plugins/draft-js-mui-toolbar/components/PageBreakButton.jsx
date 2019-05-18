import React, { Component } from 'react';
import AtomicBlockButton from '../utils/AtomicBlockButton';
import Icon from 'mdi-material-ui/FormatPageBreak'

export default class BoldButton extends Component {
    render() {
        return (
            <AtomicBlockButton {...this.props} styleType={'BOLD'} name={'Bold Button'} >
                <Icon />
            </AtomicBlockButton>
        );
    }
}

