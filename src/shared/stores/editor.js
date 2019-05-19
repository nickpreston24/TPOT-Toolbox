import { EditorState, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { action, computed, decorate, observable, toJS } from 'mobx';
import { baseBlockStyleFn, baseStyleMap, blockRenderer, blockRenderMap, draftContentFromHtml, draftContentToHtml, stateFromElementConfig } from "../../apps/Editor/utils/transforms";
import { draft } from '../../apps/Editor'

class EditorStore {

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = this.rootStore.lettersStore.notify

        window.addEventListener("message", msg => {
            if (msg.data.event === "draftjs-editor-reload") this.loadEditorFromDocx(msg.data.html)
        });

    }

    // @observable notify = this.rootStore.lettersStore.notify

    editor = null
    originalState = 'Original'
    editorState = createEditorStateWithText('Hello from MobX!')
    codeState = 'Code'
    baseStyleMap = baseStyleMap
    baseBlockStyleFn = baseBlockStyleFn
    blockRenderer = blockRenderer
    blockRenderMap = blockRenderMap
    editorNode = null
    editMode = 'edited'
    modes = [
        'original',
        'edited',
        'code',
    ]

    onChange = editorState =>
        this.editorState = editorState

    setRef = node =>
        this.editor = node

    focus() {
        // console.log(this.editor)
        if (this.editor !== null && this.editor.focus !== null) {
            try {
                this.editor.focus()
            } catch (error) {
                
            }
        }
    }

    loadEditorFromDocx = html => {
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

    saveSession = async () => {
        draft.saveSession(this.originalState, this.editorState, this.codeState, this.baseStyleMap, this.notify)
    }

    clearSession = (notify) => {
        this.editorState = EditorState.createEmpty()
        notify('Cleared Editor')
    }

    setEditMode = (e, tab) =>
        this.editMode = this.modes[tab]

    setStyleMap = customStyleMap => {
        console.log(toJS(this.baseStyleMap))
        this.baseStyleMap = customStyleMap
        console.log(toJS(this.baseStyleMap))
    }

    handleKeyCommand = (command, store) => {
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

    myKeyBindingFn = (e) => {
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

    get editModeKey() {
        return this.modes.indexOf(this.editMode)
    }

    get editorCode() {
        return draftContentToHtml(
            this.editorState,
            this.editorState.getCurrentContent()
        );
    }

}

export default decorate(
    EditorStore, {
        editor: observable,
        originalState: observable,
        editorState: observable,
        codeState: observable,
        baseStyleMap: observable,
        baseBlockStyleFn: observable,
        blockRenderer: observable,
        blockRenderMap: observable,
        editorNode: observable,
        editMode: observable,
        modes: observable,
        onChange: action,
        setRef: action,
        focus: action.bound,
        loadEditorFromDocx: action,
        saveSession: action,
        clearSession: action,
        setEditMode: action,
        setStyleMap: action,
        handleKeyCommand: action,
        myKeyBindingFn: action,
        editModeKey: computed,
        editorCode: computed,
    })