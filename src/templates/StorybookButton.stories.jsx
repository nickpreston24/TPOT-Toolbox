import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import StorybookButton from '../shared/views/StorybookButton';

storiesOf('Storybook', module)
    // .addDecorator(withKnobs)
    .add('Welcome', () =>
        <StorybookButton />
    )
    .add('Getting Started', () =>
        <StorybookButton
            task={{
                name: 'Task1'
            }}
        />
    )
    .add('API', () =>
        <StorybookButton
            task={{
                name: 'Task2',
                state: 'pinned'
            }}
        />
    )