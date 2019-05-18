// IMPORTS
///////////////////////////////////////////////////////////////////////////////////////////////////

import createSoftNewLinePlugin from '@jimmycode/draft-js-soft-newline-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createLinkDecoratorsPlugin from './draft-js-link-decorators'
import createLinkPlugin from 'draft-js-link-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import 'draft-js-link-plugin/lib/plugin.css';
import createMuiToolbarPlugin from './draft-js-mui-toolbar';
import HorizontalRule from './draft-js-mui-toolbar/utils/HorizontalRule'


// SETUPS
///////////////////////////////////////////////////////////////////////////////////////////////////

const muiToolbarPlugin = createMuiToolbarPlugin()
const softNewLinePlugin = createSoftNewLinePlugin()
const linkDecorators = createLinkDecoratorsPlugin()
const linkPlugin = createLinkPlugin()
const linkifyPlugin = createLinkifyPlugin({
    // component: HorizontalRule
})
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