// import decorateComponentWithProps from 'decorate-component-with-props';
import createStyles from 'draft-js-custom-styles';
// import createStore from './utils/createStore';
import MuiToolbar from './components/MuiToolbar'
import React from 'react'
import { configure } from 'mobx'
import { Provider } from 'mobx-react';
import ToolbarStore from './utils/toolbar'

configure({ enforceActions: "observed" })

const createMuiToolbarPlugin = () => {

    const store = new ToolbarStore()

    return { 
        initialize: ({ getEditorState, setEditorState, getEditorRef, getProps }) => {
            const PREFIX = 'CUSTOM_'
            const { styles } = createStyles(['font-size', 'color', 'background'], PREFIX);
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
            store.updateItem('getEditorRef', getEditorRef);
            store.updateItem('getEditorProps', getProps);
            store.updateItem('customStyleFunctions', styles)
            store.updateItem('customStylePrefix', PREFIX)
        },
        onChange: (editorState) => {
            store.updateItem('selection', editorState.getSelection());
            return editorState;
        },
        
        MuiToolbar: () => <Provider store={store}>
                             <MuiToolbar />
                          </Provider>
};
};

export default createMuiToolbarPlugin