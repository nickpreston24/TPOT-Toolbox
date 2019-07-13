import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Sidebar } from '../apps/Toolbox/views/Sidebar';

const expanded = boolean(
    'Expanded',
    false
)

const theme = select(
    'Theme',
    {
        Mixed: 'mixed',
        Dark: 'dark',
        Light: 'light'
    }
)

storiesOf('Toolbox/Sidebar', module)
    .addDecorator(withKnobs)
    .add('default', () =>
        <Sidebar {...{ expanded, theme }} />
    )
    .add('empty', () =>
        <Sidebar {...{ expanded, theme }} />
    )