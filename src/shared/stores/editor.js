<<<<<<< HEAD
import { EditorState, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { action, computed, observable} from 'mobx';
import { baseBlockStyleFn, baseStyleMap, blockRenderer, blockRenderMap, draftContentFromHtml, draftContentToHtml, stateFromElementConfig } from "../../apps/Editor/utils/transforms";
import { persist } from 'mobx-persist'
import { draft } from '../../apps/Editor'
import { convertFile } from "../utilities/converter";
=======
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
>>>>>>> bugfix/logout-shows-remaining-text

// : Anything that  uses @persist will be automatically subscribed to offline localforage storage

export default class EditorStore {

    @observable editorState = createEditorStateWithText('Click catch a cat...');

    constructor(rootStore, sessionStore) {
        this.rootStore = rootStore;
        this.sessionStore = sessionStore;
        // this.session = sessionStore.currentSession
<<<<<<< HEAD
        // console.log(sessionStore)
        this.notify = this.rootStore.servicesStore.notify
=======
        console.log('EditorStore cotr() => Session store loaded? ', !!sessionStore && sessionStore);
        this.notify = this.rootStore.lettersStore.notify;
>>>>>>> bugfix/logout-shows-remaining-text

        window.addEventListener("message", listener => {
            const {event, html} = listener.data;
            if (event === "draftjs-editor-reload") 
                this.loadEditorFromDocx(html);
        });

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
<<<<<<< HEAD
    ]

    @action suscribe = session =>{
        // this.session = session
//        console.log("AB", this.session)
    }

    @action onChange = editorState =>
        // this.sessionStore.currentSession.editorState = editorState
        this.sessionStore.session.editorState = editorState
=======
    ];
    
    @action subscribe = session =>{
        // this.session = session
        console.log("AB", this.session)
    };
    
    @action onChange = editorState =>        
        this.sessionStore.session.editorState = editorState;
>>>>>>> bugfix/logout-shows-remaining-text

    @action setRef = node =>
        this.editor = node;

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
<<<<<<< HEAD
        let html = await convertFile(file)
//        console.warn(`${!!html ? 'Doc Sucessfully Converted' : 'Error in converting DocX'}`)
=======
        let html = await convertFile(file);
        console.warn(`${!!html ? 'Doc Successfully Converted' : 'Error in converting DocX'}`);
>>>>>>> bugfix/logout-shows-remaining-text
        this.loadEditorFromDocx(html)
    };

    @action loadEditorFromDocx = html => {
        // let baseStyleMapClear = JSON.parse(JSON.stringify(Object.assign(toJS(baseStyleMap))))
        const { newContentState, newBaseStyleMap } = draftContentFromHtml(html, stateFromElementConfig, baseStyleMap);
        this.baseStyleMap = newBaseStyleMap;
        this.originalState = html;
        this.baseStyleMap = newBaseStyleMap;
        console.log('loadEditorFromDocx() => CurrentSession?', this.sessionStore.currentSession);
        console.log(`loadEditorFromDocx() => sessionStore?`, this.sessionStore.currentSession);
        this.sessionStore.currentSession.editorState = EditorState.createWithContent(newContentState);
        this.codeState = draftContentToHtml(this.sessionStore.currentSession.editorState, newContentState);
        let that = this;
        setTimeout(function () {
<<<<<<< HEAD
            that.focus()
//            console.log('lets do this')
=======
            that.focus();
            console.log('lets do this')
>>>>>>> bugfix/logout-shows-remaining-text
        }, 500);
    };

    @action newSession = () => {
        this.notify('Started a New Letter')
    }

    @action saveSession = async () => {
        draft.saveSession(this.originalState, this.editorState, this.codeState, this.baseStyleMap, this.notify)
    };

    @action clearSession = (notify) => {
<<<<<<< HEAD
        this.editorState = EditorState.createEmpty()
        this.notify('Reset Letter to Original', {variant: "error"})
    }
=======
        this.editorState = EditorState.createEmpty();
        this.notify('Cleared Editor', {variant: "error"})
    };
>>>>>>> bugfix/logout-shows-remaining-text

    @action setEditMode = (e, tab) =>
        this.editMode = this.modes[tab];

<<<<<<< HEAD
   @action  setStyleMap = customStyleMap => {
//        console.log(toJS(this.baseStyleMap))
        this.baseStyleMap = customStyleMap
//        console.log(toJS(this.baseStyleMap))
    }
=======
    @action  setStyleMap = customStyleMap => {
        console.log(toJS(this.baseStyleMap));
        this.baseStyleMap = customStyleMap;
        console.log(toJS(this.baseStyleMap))
    };
>>>>>>> bugfix/logout-shows-remaining-text

    @action handleKeyCommand = (command, store) => {
        const notify = this.notify;
        if (command === 'save') {
            this.saveSession(this.notify);
            return 'handled';
        }
        if (command === 'open') {
            // this.clearSession(notify)
<<<<<<< HEAD
//            console.log('load file')
=======
            console.log('load file');
>>>>>>> bugfix/logout-shows-remaining-text
            return 'handled';
        }
        if (command === 'publish') {
            this.rootStore.lettersStore.togglePublishModal();
            return 'handled';
        }
        return 'not-handled';
    };

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