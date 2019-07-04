import React from 'react';
import { Dashboard } from '../apps/Toolbox/views/Dashboard'
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const variant = select (
    'Variant', 
    {
        Default: 'default',
        Empty: 'empty',
        Loading: 'loading',
        Error: 'error'
    },
    'default',
    'gp10'
)

storiesOf('Toolbox/Dashboard', module)
    .add('dynamic', () => <Dashboard {...{variant}} />)