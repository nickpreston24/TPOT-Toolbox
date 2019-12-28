import { EditorState, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { action, computed, observable } from 'mobx';
import { baseBlockStyleFn, baseStyleMap, blockRenderer, blockRenderMap, draftContentFromHtml, draftContentToHtml, stateFromElementConfig } from "../../apps/Editor/utils/transforms";
import { persist } from 'mobx-persist'
import { draft } from '../../apps/Editor'
import { convertFile } from "../utilities/converter";
import { findBadProps } from "../utilities/debug";

// : Anything that  uses @persist will be automatically subscribed to offline localforage storage

export default class EditorStore {

    @observable editorState = createEditorStateWithText('This is some typing in Draft. Woohoo! :D')

    constructor(rootStore, sessionStore) {
        this.rootStore = rootStore
        this.sessionStore = sessionStore
        this.notify = this.rootStore.servicesStore.notify

        window.addEventListener("message", msg => {
            if (msg.data.event === "draftjs-editor-reload") this.loadEditorFromDocx(msg.data.html)
        });

        findBadProps(this, 'editor.js')
    }

    @persist @observable clean = true
    @persist @observable editMode = 'edited'
    @persist @observable originalState = 'Original'
    @observable editor = null
    @observable editorNode = null
    @observable baseStyleMap = baseStyleMap
    @observable codeState = 'Code'
    @observable baseBlockStyleFn = baseBlockStyleFn
    @observable blockRenderer = blockRenderer
    @observable blockRenderMap = blockRenderMap
    modes = [
        'original',
        'edited',
        'code',
    ]

    @action suscribe = session => {
    }

    @action onChange = editorState =>
        this.editorState = editorState

    @action setRef = node =>
        this.editor = node

    @action.bound focus() {
        if (this.editor !== null && this.editor.focus !== null) {
            try {
                this.editor.focus()
            } catch (error) {

            }
        }
    }

    @action convertFileToDraftState = async (file) => {
        let html = await convertFile(file)
        this.loadEditorFromDocx(html)
    }

    @action loadEditorFromDocx = html => {
        const { newContentState, newBaseStyleMap } = draftContentFromHtml(html, stateFromElementConfig, baseStyleMap);
        this.baseStyleMap = newBaseStyleMap
        this.originalState = html
        this.baseStyleMap = newBaseStyleMap
        this.editorState = EditorState.createWithContent(newContentState);
        this.codeState = draftContentToHtml(this.editorState, newContentState);
        let that = this
        setTimeout(function () {
            that.focus()
        }, 500);
    }

    @action newSession = () => {
        this.notify('Started a New Letter')
    }

    @action saveSession = async () => {
        draft.saveSession(this.originalState, this.editorState, this.codeState, this.baseStyleMap, this.notify)
    }

    @action clearSession = (notify) => {
        this.editorState = EditorState.createEmpty()
        this.notify('Reset Letter to Original', { variant: "error" })
    }

    @action setEditMode = (e, tab) =>
        this.editMode = this.modes[tab]

    @action setStyleMap = customStyleMap => {
        this.baseStyleMap = customStyleMap
    }

    @action handleKeyCommand = (command) => {
        if (command === 'save') {
            this.saveSession(this.notify)
            return 'handled';
        }
        if (command === 'open') {
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
            this.session.editorState,
            this.session.editorState.getCurrentContent()
        );
    }

}