import React from 'react'
import { Provider } from 'mobx-react';
import DecoratorStore from './utils/decorator'
import LinkSpan from './components/LinkSpan';
import * as $ from './utils/strategies';

const createLinkDecoratorsPlugin = () => {

    const store = new DecoratorStore()

    const callbacks = {
        // : Keep commented Callbacks for now
        // keyBindingFn: undefined,
        // handleKeyCommand: undefined,
        // onDownArrow: undefined,
        // onUpArrow: undefined,
        // onTab: undefined,
        // onEscape: undefined,
        // handleReturn: undefined,
        onChange: undefined,
    };

    const createEntityComponent = (strategy, regex) => {
        return (props) => {
            return (
                <Provider store={store} >
                    <LinkSpan
                        children={props.children}
                        decoratedtext={props.decoratedText}
                        entitykey={props.entityKey}
                        offsetkey={props.offsetKey}
                        geteditorstate={props.getEditorState}
                        seteditorstate={props.setEditorState}
                        callbacks={callbacks}
                        strategy={strategy}
                        regex={$[regex]}
                    />
                </Provider>
            )
        }
    }

    return {
        decorators: [
            {
                strategy: $.markup,
                component: createEntityComponent('markup', 'MARKUP_REGEX')
            },
            {
                strategy: $.shortcode,
                component: createEntityComponent('shortcode', 'SHORT_CODE_REGEX')
            },
            {
                strategy: $.generic,
                component: createEntityComponent('generic', 'GENERIC_REGEX')
            },
            {
                strategy: $.entity,
                component: createEntityComponent('entity', null)
            }
        ],

        initialize: ({ getEditorState, setEditorState, getProps, ...rest }) => {
            store.setItem('currentEditorState', getEditorState())
            store.setItem('getProps', getProps)
            console.log(getProps)
            const editor = store.getProps().editorRef
            if (editor) {
                // editor.focus()
            }
            store.getProps().editorFocus()
        },
        onChange: (editorState, props) => {
            let newEditorState = callbacks.onChange ? callbacks.onChange(editorState) : editorState
            console.log('TS: ', props.getProps().baseStyleMap)
            store.setItem('currentEditorState', newEditorState)
            
            // const editor = store.getProps().editorRef
            // console.log('GET', editor )
            // if (editor) {
            //     // editor.focus()
            // }

            
            return newEditorState;
        },
        handleBeforeInput: (chars, editorState) => {
            // console.log(chars, editorState)
        },
    };
};

export default createLinkDecoratorsPlugin