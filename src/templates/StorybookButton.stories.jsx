import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import StorybookButton from '../shared/views/StorybookButton';

storiesOf('Storybook', module)
    // .addDecorator(withKnobs)
    .add('default', () =>
        <StorybookButton />
    )
    .add('task', () =>
        <StorybookButton
            task={{
                name: 'Task1'
            }}
        />
    )
    .add('pinned', () =>
        <StorybookButton
            task={{
                name: 'Task2',
                state: 'pinned'
            }}
        />
    )