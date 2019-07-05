import React from 'react';
import { Dashboard } from '../apps/Toolbox/views/Dashboard'
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { AppShelf } from '../apps/Toolbox/views/AppShelf'
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

const appShelf = () =>
    <AppShelf
        {...{ expanded, theme }}
    >
        <ShelfButton tooltip='Letters' icon='fa-letters' route='/letters' active={true} />
        <ShelfButton tooltip='Patch' icon='fa-letters' route='/letters' active={false} />
        <ShelfButton tooltip='Sort' icon='fa-letters' route='/letters'  active={false} />
    </AppShelf>

storiesOf('Toolbox/Dashboard', module)
    .addDecorator(withKnobs)
    .add('default', () =>
        <Dashboard
            appShelf={appShelf}
            {...{ expanded, theme }}
        />
    )
    .add('empty', () =>
        <Dashboard variant='loading'  {...{ expanded, theme }} />
    )
    .add('loading', () =>
        <Dashboard variant='loading'  {...{ expanded, theme }} />
    )
    .add('error', () =>
        <Dashboard variant='error'  {...{ expanded, theme }} />
    )