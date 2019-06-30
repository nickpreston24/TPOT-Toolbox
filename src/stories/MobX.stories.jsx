import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { MobX } from './MobX';

storiesOf('MobX', module)
  // .addDecorator(withKnobs)
  .add('default', () => <MobX task={task} {...actions} />)
  .add('pinned', () => <MobX task={{ ...task, state: 'pinned' }} {...actions} />)