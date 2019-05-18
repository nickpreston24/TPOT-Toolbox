import React, { Component } from 'react';
import ToggleLinkButton from '../utils/ToggleLinkButton';
import Icon from 'mdi-material-ui/Link'

export default class LinkButton extends Component {
    render() {
        return (
            <ToggleLinkButton {...this.props} styleType={'LINK'} name={'Link Button'} >
                <Icon />
            </ToggleLinkButton>
        );
    }
}

