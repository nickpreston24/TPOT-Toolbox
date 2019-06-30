import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import StorybookButton from '../shared/views/StorybookButton';

const task = {
    name: 'MobXz'
}

const actions = {
    test: 'good1',
    test2: 'good2'
}

storiesOf('Storybook', module)
  // .addDecorator(withKnobs)
  .add('default', () => <StorybookButton task={task} {...actions} />)
  .add('pinned', () => <StorybookButton task={{ ...task, state: 'pinned' }} {...actions} />)