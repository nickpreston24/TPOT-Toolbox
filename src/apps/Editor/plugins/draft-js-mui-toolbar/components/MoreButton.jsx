import React, { Component } from 'react';
import InlineStyleButton from '../utils/InlineStyleButton';
import Icon from 'mdi-material-ui/DotsHorizontal'

export default class MoreButton extends Component {
    render() {
        return (
            <InlineStyleButton {...this.props} styleType={'More'} name={'More Button'} >
                <Icon />
            </InlineStyleButton>
        );
    }
}

