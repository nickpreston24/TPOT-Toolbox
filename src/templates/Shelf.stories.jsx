import React from 'react';
import { Shelf } from '../apps/Toolbox/views/Shelf'
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

storiesOf('Toolbox/Shelf', module)
    .addDecorator(withKnobs)
    .add('default', () =>
        <Shelf
            {...{ expanded, theme }}
        >
            <ShelfButton tooltip='Letters' icon='fa-letters' route='/letters' active={true} />
            <ShelfButton tooltip='Patch' icon='fa-letters' route='/letters' active={false} />
            <ShelfButton tooltip='Sort' icon='fa-letters' route='/letters' active={false} />
        </Shelf>
    )
    .add('empty', () =>
        <Shelf {...{ expanded, theme }} />
    )