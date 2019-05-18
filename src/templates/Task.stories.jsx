import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, text, optionsKnob as options } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Task from './Task';

export const task = {
  id: '1',
  title: 'I am a task',
  state: 'TASK_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actions = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

export const dynamic = {
  id: '1',
  title: text('Name', 'I am a task'),
  // state: options('Variant', {
  //   normal: null,
  //   pinned: 'pinned',
  //   archived: 'archived',
  // }, 'pinned', { display: 'inline-radio' }),
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

storiesOf('Task', module)
  // .addDecorator(withKnobs)
  .add('default', () => <Task task={task} {...actions} />)
  .add('pinned', () => <Task task={{ ...task, state: 'pinned' }} {...actions} />)
  .add('archived', () => <Task task={{ ...task, state: 'archived' }} {...actions} />)
  .add('dynamic', () => <Task task={{ title: dynamic.title }} {...actions} />);