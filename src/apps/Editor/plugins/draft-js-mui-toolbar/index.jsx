// import decorateComponentWithProps from 'decorate-component-with-props';
import createStyles from 'draft-js-custom-styles';
// import createStore from './utils/createStore';
import MuiToolbar from './components/MuiToolbar'
import React from 'react'
import { configure, toJS } from 'mobx'
import { Provider, inject } from 'mobx-react';
import ToolbarStore from './utils/toolbar'

configure({ enforceActions: "never" })

const createMuiToolbarPlugin = () => {

    const toolbarStore = new ToolbarStore()

    return {
        initialize: ({ getEditorState, setEditorState, getEditorRef, getProps }) => {
            const PREFIX = 'CUSTOM_'
            const { styles } = createStyles(['font-size', 'color', 'background'], PREFIX);
            toolbarStore.updateItem('getEditorState', getEditorState);
            toolbarStore.updateItem('setEditorState', setEditorState);
            toolbarStore.updateItem('getEditorRef', getEditorRef);
            toolbarStore.updateItem('getEditorProps', getProps);
            toolbarStore.updateItem('customStyleFunctions', styles)
            toolbarStore.updateItem('customStylePrefix', PREFIX)
        },
        onChange: (editorState) => {
            toolbarStore.updateItem('selection', editorState.getSelection());
            return editorState;
        },

        MuiToolbar: () => <Provider toolbarStore={toolbarStore}>
            <MuiToolbar />
        </Provider>
    };
};

export default createMuiToolbarPlugin

