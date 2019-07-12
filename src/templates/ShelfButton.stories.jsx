import React from 'react';
import { ShelfButton } from '../apps/Toolbox/views/ShelfButton'
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

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

storiesOf('Toolbox/ShelfButton', module)
    .addDecorator(withKnobs)
    .add('default', () =>
        <ShelfButton />
    )