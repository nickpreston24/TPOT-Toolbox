import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, text, optionsKnob as options } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Library from './Library';
import catalog from '../config/catalog'

// export const task = {
//   id: '1',
//   title: 'I am a task',
//   state: 'TASK_INBOX',
//   updatedAt: new Date(2018, 0, 1, 9, 0),
// };

// export const actions = {
//   onPinTask: action('onPinTask'),
//   onArchiveTask: action('onArchiveTask'),
// };

// export const dynamic = {
//   id: '1',
//   title: text('Name', 'I am a task'),
//   // state: options('Variant', {
//   //   normal: null,
//   //   pinned: 'pinned',
//   //   archived: 'archived',
//   // }, 'pinned', { display: 'inline-radio' }),
//   updatedAt: new Date(2018, 0, 1, 9, 0),
// };

const config = {
  backgrounds: [
    { name: 'paper', value: '#f4f3ef', default: true }
  ]
}

const items = new Object(Array(12))
items.fill('')

storiesOf('Library', module)
  .add('empty', () => <Library />, config)
  .add('with cards', () => <Library {...{ catalog }} />, config)