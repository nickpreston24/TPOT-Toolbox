import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { storiesOf } from '@storybook/react';
import { action as actionSB } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import Toolbox from '../apps/Toolbox/indexNew'

storiesOf('Master', module)
    .add('Full Static App', () => <Toolbox />);