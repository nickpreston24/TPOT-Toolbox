import {EditorState, getDefaultKeyBinding, KeyBindingUtil} from "draft-js";
import {createEditorStateWithText} from "draft-js-plugins-editor";
import {action, computed, observable, toJS} from 'mobx';
import {
    baseBlockStyleFn,
    baseStyleMap,
    blockRenderer,
    blockRenderMap,
    draftContentFromHtml,
    draftContentToHtml,
    stateFromElementConfig
} from "../../apps/Editor/utils/transforms";
import {persist} from 'mobx-persist'
import {draft} from '../../apps/Editor'
import {convertFile} from "../utilities/converter";
import {nameof, hasProp} from "../utilities/helpers";

// : Anything that  uses @persist will be automatically subscribed to offline localforage storage

export default class EditorStore {

    @observable editorState = createEditorStateWithText('Click catch a cat...');

    constructor(rootStore, sessionStore) {
        this.rootStore = rootStore;
        this.sessionStore = sessionStore;
        // this.session = sessionStore.currentSession
        // console.warn(`Session store is not loaded in ${nameof(this)}`, !!sessionStore && sessionStore);
        // if(!!this.notify && this.notify.type === 'function')
        this.notify = this.rootStore.notify;

        window.addEventListener("message", listener => {
            const {event, html} = listener.data;
            if (event === "draftjs-editor-reload")
                this.loadEditorFromDocx(html);
        });

        // alert(!this.has(this,'rootStore'));
        hasProp(this, 'rootStore');
        hasProp(this, nameof({rootStore}));
        // alert(!this.hasProp(this,'rootStore'));
    }

    @persist @observable clean = true;
    @persist @observable editMode = 'edited';
    @persist @observable originalState = 'Original';
    @observable editor = null;
    @observable editorNode = null;
    @observable baseStyleMap = baseStyleMap;
    @observable codeState = 'Code';
    @observable baseBlockStyleFn = baseBlockStyleFn;
    @observable blockRenderer = blockRenderer;
    @observable blockRenderMap = blockRenderMap;
    modes = [
        'original',
        'edited',
        'code',
    ];

    // Subscribe or change sessionStore:
    // @action subscribe = nextSession => {
    //     this.session = nextSession;
    // };

    @action onChange = editorState => {
        this.sessionStore.session.editorState = editorState;
    }

    @action setRef = node => {
        if (!!this.editor)
            this.editor = node;
        else
        // console.warn(`${nameof(this.editor)} cannot be null!`);
            console.warn(`editorStore cannot be null!`);
    };

    @action.bound focus() {
        // console.log(this.editor)
        if (this.editor !== null && this.editor.focus !== null) {
            try {
                this.editor.focus()
            } catch (error) {

            }
        }
    }

    @action convertFileToDraftState = async (file) => {
        let html = await convertFile(file);
        // console.warn(`${!!html ? 'Doc Successfully Converted' : 'Error in converting DocX'}`);
        this.loadEditorFromDocx(html)
    };

    @action loadEditorFromDocx = html => {
        // let baseStyleMapClear = JSON.parse(JSON.stringify(Object.assign(toJS(baseStyleMap))))
        const {newContentState, newBaseStyleMap} = draftContentFromHtml(html, stateFromElementConfig, baseStyleMap);
        this.baseStyleMap = newBaseStyleMap;
        this.originalState = html;
        this.baseStyleMap = newBaseStyleMap;
        const currentSession = this.sessionStore;
        console.log('loadEditorFromDocx() => CurrentSession?', currentSession);
        console.log(`loadEditorFromDocx() => sessionStore?`, this.sessionStore);
        currentSession.editorState = EditorState.createWithContent(newContentState);
        this.codeState = draftContentToHtml(currentSession.editorState, newContentState);
        let that = this;
        setTimeout(function () {
            that.focus()
//            console.log('lets do this')
        }, 500);
    };

    @action newSession = () => {
        // this.notify('Started a New Letter')
    }

    @action saveSession = async () => {
        draft.saveSession(this.originalState, this.editorState, this.codeState, this.baseStyleMap, this.notify)
    };

    @action clearSession = (notify) => {
        this.editorState = EditorState.createEmpty();
        // this.notify('Cleared Editor', {variant: "error"})
    };

    @action setEditMode = (e, tab) =>
        this.editMode = this.modes[tab];

    @action  setStyleMap = customStyleMap => {
        //console.log(toJS(this.baseStyleMap))
        this.baseStyleMap = customStyleMap
        //console.log(toJS(this.baseStyleMap))
    }

    @action handleKeyCommand = (command, store) => {
        if (command === 'save') {
            this.saveSession(this.notify);
            return 'handled';
        }
        if (command === 'open') {
            // this.clearSession(notify)
            //console.log('load file')
            return 'handled';
        }
        if (command === 'publish') {
            this.rootStore.lettersStore.togglePublishModal();
            return 'handled';
        }
        return 'not-handled';
    };

    @action myKeyBindingFn = (e) => {
        const {hasCommandModifier} = KeyBindingUtil;
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
    };

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