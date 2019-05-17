import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, text, optionsKnob as options } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import VideoCard from './VideoCard';

const props = {
  id: 'fLjslMtjkhs',
  title: 'Harvest Haven Pastured Poultry – Free Range Living',
  description: 'Harvest Haven laying hens, broilers, and turkeys are truly pasture raised and free range.  Our birds are in the pasture during the growing season where they get to scratch, hunt for bugs, and eat all the greens they want.'
}

storiesOf('Library/VideoCard', module)
  .addDecorator(withKnobs)
  .add('skeleton', () => <VideoCard />)
  .add('default', () => <VideoCard {...props} />)
  .add('loading', () => <VideoCard {...props} variant="loading" />)
  .add('error', () => <VideoCard {...props} variant="error" />)