import React from 'react';
import { Dashboard } from '../apps/Toolbox/views/Dashboard'
import { storiesOf } from '@storybook/react';

storiesOf('Toolbox/Dashboard', module)
    .add('default', () => <Dashboard  />)
    .add('loading', () => <Dashboard variant='loading' />)
    .add('error', () => <Dashboard variant='error' />)