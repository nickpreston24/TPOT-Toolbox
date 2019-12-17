// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

import createSoftNewLinePlugin from '@jimmycode/draft-js-soft-newline-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createLinkDecoratorsPlugin from './draft-js-link-decorators'
import 'draft-js-link-plugin/lib/plugin.css';
import createMuiToolbarPlugin from './draft-js-mui-toolbar';


// SETUPS
///////////////////////////////////////////////////////////////////////////////////////////////////

const muiToolbarPlugin = createMuiToolbarPlugin()
const softNewLinePlugin = createSoftNewLinePlugin()
const linkDecorators = createLinkDecoratorsPlugin()
const alignmentPlugin = createAlignmentPlugin()
const imagePlugin = createImagePlugin();

// EXPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

export const {
    MuiToolbar // Pull React componenet from plugin instance
} = muiToolbarPlugin;

export const plugins = [
    alignmentPlugin,
    imagePlugin,
    muiToolbarPlugin,
    softNewLinePlugin,
    linkDecorators,
    // linkPlugin,
    // linkifyPlugin
];