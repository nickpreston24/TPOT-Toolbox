import React from 'react';
import Box from './Box'
import Checkbox from '@material-ui/core/Checkbox'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { shadows, palette, spacing, typography } from '@material-ui/system';
import { Typography } from '@material-ui/core';


export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <Box {...{id}} border={1} display="flex" alignItems="center">
      <Box><Checkbox disabled={state === 'archived' && true} /></Box>
      <Box flexGrow={1}><Typography style={state === 'archived' ? {color: 'rgba(0, 0, 0, 0.26)', textDecoration: 'line-through'} : {}} disabled={state === 'archived' && true}>{title}</Typography></Box>
      <Box><Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={state === 'pinned' && true} disabled={state === 'archived' && true} /></Box>
    </Box>
    // <div className="list-item">
    //   <input type="text" value={title} readOnly={true} />
    // </div>
  );
}