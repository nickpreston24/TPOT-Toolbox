import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, text, optionsKnob as options } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import VideoPage from './VideoPage';
import catalog from '../config/catalog'

const items = new Object(Array(12))
items.fill('')

const match = {
  params: {
    id: 'fLjslMtjkhs'
  }
}
storiesOf('VideoPage', module)
  .add('empty', () => <VideoPage />)
  .add('with id', () => <VideoPage {...{ match }} />)