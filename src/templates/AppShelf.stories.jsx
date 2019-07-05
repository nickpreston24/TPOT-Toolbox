import React from 'react';
import { AppShelf } from '../apps/Toolbox/views/AppShelf'
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { ShelfButton } from '../apps/Toolbox/views/ShelfButton';

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

storiesOf('Toolbox/AppShelf', module)
    .addDecorator(withKnobs)
    .add('default', () =>
        <AppShelf
            {...{ expanded, theme }}
        >
            <ShelfButton tooltip='Letters' icon='fa-letters' route='/letters' active={true} />
            <ShelfButton tooltip='Patch' icon='fa-letters' route='/letters' active={false} />
            <ShelfButton tooltip='Sort' icon='fa-letters' route='/letters' active={false} />
        </AppShelf>
    )
    .add('empty', () =>
        <AppShelf {...{ expanded, theme }} />
    )