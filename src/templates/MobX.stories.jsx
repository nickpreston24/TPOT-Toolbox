import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { MobX } from './MobX';

const task = {
    name: 'MobXz'
}

const actions = {
    test: 'good1',
    test2: 'good2'
}

storiesOf('MobX', module)
  // .addDecorator(withKnobs)
  .add('default', () => <MobX task={task} {...actions} />)
  .add('pinned', () => <MobX task={{ ...task, state: 'pinned' }} {...actions} />)