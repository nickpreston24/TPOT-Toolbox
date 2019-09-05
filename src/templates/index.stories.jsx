import React from 'react';
import { storiesOf } from '@storybook/react';
import Toolbox from '../apps/Toolbox'

storiesOf('Master', module)
    .add('Full Static App', () => <Toolbox />);