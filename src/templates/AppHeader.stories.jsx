import React from 'react';
import { Shelf } from '../apps/Toolbox/views/Shelf'
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { AppHeader } from '../apps/Toolbox/views/AppHeader';

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

storiesOf('Toolbox/Header', module)
    .addDecorator(withKnobs)
    .add('default', () =>
        <AppHeader {...{ expanded, theme }} />
    )
    .add('empty', () =>
        <AppHeader {...{ expanded, theme }} />
    )