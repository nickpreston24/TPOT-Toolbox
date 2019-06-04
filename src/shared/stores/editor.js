import { EditorState, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { action, computed, decorate, observable, toJS } from 'mobx';
import { baseBlockStyleFn, baseStyleMap, blockRenderer, blockRenderMap, draftContentFromHtml, draftContentToHtml, stateFromElementConfig } from "../../apps/Editor/utils/transforms";
import { create, persist } from 'mobx-persist'
import { draft } from '../../apps/Editor'

// : Anything that  uses @persist will be automatically subscribed to offline localforage storage

export default class EditorStore {

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = this.rootStore.lettersStore.notify

        window.addEventListener("message", msg => {
            if (msg.data.event === "draftjs-editor-reload") this.loadEditorFromDocx(msg.data.html)
        });

    }
    
    @persist @observable clean = true
    @persist @observable editMode = 'edited'
    @persist @observable originalState = 'Original'
    @observable editor = null
    @observable editorNode = null
    @observable baseStyleMap = baseStyleMap
    @observable editorState = createEditorStateWithText('Click to start typing a note...')
    @observable codeState = 'Code'
    @observable baseBlockStyleFn = baseBlockStyleFn
    @observable blockRenderer = blockRenderer
    @observable blockRenderMap = blockRenderMap
    modes = [
        'original',
        'edited',
        'code',
    ]

    @action onChange = editorState =>
        this.editorState = editorState

    @action setRef = node =>
        this.editor = node

    @action.bound focus() {
        // console.log(this.editor)
        if (this.editor !== null && this.editor.focus !== null) {
            try {
                this.editor.focus()
            } catch (error) {
                
            }
        }
    }

    @action loadEditorFromDocx = html => {
        // let baseStyleMapClear = JSON.parse(JSON.stringify(Object.assign(toJS(baseStyleMap))))
        const { newContentState, newBaseStyleMap } = draftContentFromHtml(html, stateFromElementConfig, baseStyleMap);
        this.baseStyleMap = newBaseStyleMap
        this.originalState = html
        this.baseStyleMap = newBaseStyleMap
        this.editorState = EditorState.createWithContent(newContentState);
        this.codeState = draftContentToHtml(this.editorState, newContentState);
        let that = this
        setTimeout(function () {
            that.focus()
            console.log('lets do this')
        }, 500);
    }

    @action saveSession = async () => {
        draft.saveSession(this.originalState, this.editorState, this.codeState, this.baseStyleMap, this.notify)
    }

    @action clearSession = (notify) => {
        this.editorState = EditorState.createEmpty()
        this.notify('Cleared Editor')
    }

    @action setEditMode = (e, tab) =>
        this.editMode = this.modes[tab]

   @action  setStyleMap = customStyleMap => {
        console.log(toJS(this.baseStyleMap))
        this.baseStyleMap = customStyleMap
        console.log(toJS(this.baseStyleMap))
    }

    @action handleKeyCommand = (command, store) => {
        const notify = store.notify
        if (command === 'save') {
            this.saveSession(this.notify)
            return 'handled';
        }
        if (command === 'open') {
            // this.clearSession(notify)
            console.log('load file')
            return 'handled';
        }
        if (command === 'publish') {
            this.rootStore.lettersStore.togglePublishModal()
            return 'handled';
        }
        return 'not-handled';
    }

    @action myKeyBindingFn = (e) => {
        const { hasCommandModifier } = KeyBindingUtil;
        if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
            return 'save'
        }
        if (e.keyCode === 79 /* `O key */ && hasCommandModifier(e)) {
            return 'open'
        }
        if (e.keyCode === 80 /* `P` key */ && hasCommandModifier(e)) {
            return 'publish'
        }
        return getDefaultKeyBinding(e);
    }

    @computed get editModeKey() {
        return this.modes.indexOf(this.editMode)
    }

    @computed get editorCode() {
        return draftContentToHtml(
            this.editorState,
            this.editorState.getCurrentContent()
        );
    }

}