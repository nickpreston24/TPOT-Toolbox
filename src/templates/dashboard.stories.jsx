import React from 'react';
import { Dashboard } from '../apps/Toolbox/views/Dashboard'
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { AppShelf } from '../apps/Toolbox/views/AppShelf'
import { ShelfButton } from '../apps/Toolbox/views/ShelfButton';

const theme = select(
    'Theme',
    {
        Mixed: 'mixed',
        Dark: 'dark',
        Light: 'light'
    }
)

storiesOf('Toolbox/Dashboard', module)
    .addDecorator(withKnobs)
    .add('default', () =>
        <Dashboard
            shelf={
                <AppShelf >
                    <ShelfButton tooltip='Letters' icon='fa-letters' route='/letters' active={true} />
                    <ShelfButton tooltip='Patch' icon='fa-letters' route='/letters' active={false} />
                    <ShelfButton tooltip='Sort' icon='fa-letters' route='/letters' active={false} />
                </AppShelf>
            }
            sidebar={
                null
            }
            header={
                null
            }
            currentApp={
                null
            }
            {...{ theme }}
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