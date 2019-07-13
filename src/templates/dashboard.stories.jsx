import React from 'react';
import { Dashboard } from '../apps/Toolbox/views/Dashboard'
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Shelf } from '../apps/Toolbox/views/Shelf'
import { ShelfButton } from '../apps/Toolbox/views/ShelfButton';
import { Sidebar } from '../apps/Toolbox/views/Sidebar';

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
                <Shelf >
                    <ShelfButton tooltip='Scribe' icon='scribe' path='/scribe' color="#f9b54c" active={true} />
                    <ShelfButton tooltip='Sort' icon='fa-letters' path='/sort' active={false} />
                    <ShelfButton tooltip='Patch' icon='fa-letters' path='/patch' active={false} />
                </Shelf>
            }
            sidebar={
                <Sidebar>

                </Sidebar>
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
        <Dashboard variant='loading'  {...{ theme }} />
    )
    .add('loading', () =>
        <Dashboard variant='loading'  {...{ theme }} />
    )
    .add('error', () =>
        <Dashboard variant='error'  {...{ theme }} />
    )