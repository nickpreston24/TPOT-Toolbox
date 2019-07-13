import { action, observable, computed } from "mobx";
import { persist } from "mobx-persist";
import { serializable } from 'serializr'
import { EditorState, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { convertToRaw } from 'draft-js';
import { convertFile } from "../utilities/converter";
import EditorStore from './editor'
import { draftContentToHtml } from "../../apps/Editor/utils/transforms";

export default class ScribeStore {

    @observable session = null

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = this.rootStore.lettersStore.notify
        this.editorStore = new EditorStore(this.rootStore)
        this.session = new Session(null, this.editorStore)
        this.editorStore.suscribe(this.session)
    }

    @action createSession = (file) => {
        this.session = new Session(file, this.editorStore)
        this.history.push(`/scribe/${this.session.name}`)
        this.editorStore.suscribe(this.session)
    }

    @action saveSession = () => {
        // Forcefully hydrate the persisted data using the root store's hydrate function
    }

    @action closeSession = () => {
        this.session = new Session(null, this.editorStore)
        this.editorStore.suscribe(this.session)
        // delete the current session in this.sessions[] and set this.currentSession to be one index back or forward
    }

    @action clearSession = () => {
        // pull up the session info, like the file reference and create a new Session(fileReference) to refresh completely.
    }

    @action setCurrentSession = () => {
        // this.currentSession needs to be subscribed to by the Draft editor created inside the Scribe app. 
        // When the current session is changed, the Draft editor will accept the incoming EditorState 
        // without editing the history. At the same time, the route will change, which will update the tab ui.
        // Example Editor setup: () => <Editor editorState={this.props.store.scribe.currentSession.editorState} />
    }

    @action publish = () => {
        // Publish the code contents of this.currentSession.editorState [or this.editorStore.code]
    }

    @action load = () => {
        // get the editorStore.convertfile(file)
    }

    @action preview = () => {
        // 
    }

    @action register = (keys) => {
        for (const key in keys) {
            this[`${key}`] = keys[key]
        }
    }

    @computed get currentSession() {
        return this.session
    }
    

}


class Session {

    @observable name = 'Untitled'
    @observable fullname = 'Untitled.docx'
    @observable version = 0
    @observable file = ''
    @observable contributer = ''
    @observable route = ''
    @observable slug = ''
    @observable title = ''
    @observable excerpt = ''
    @observable dateCreated = ''
    @observable lastModified = ''
    @observable editorStore = null
    @observable editorState = createEditorStateWithText('Click to start typing a note...')

    constructor(file, editorStore) {
        this.name = file ? file.name:  'Untitled'
        this.editorStore = editorStore
        if (file) this.convertFile(file)
        console.log(this)
    }

    @computed get code() {
        return draftContentToHtml(
            this.editorState,
            this.editorState.getCurrentContent()
        );
    }

    @action convertFile =  (file) => {
        this.editorStore.convertFileToDraftState(file)
    }

}

const getVersionInfo = (name) => {
    const VER_REGX = /(?:\(([\d]{1,3})\)){0,1}(\.docx)/g
    const matches = VER_REGX.exec(name)
    const sample = matches[0]
    const version = new Number(matches[1])
    const index = name.length - sample.length
    const filename = name.slice(0, index)
    return { matches, sample, version, filename, index, name }
}



/*

Scribe
\-- UI states, loading, etc.
\-- CRUD session
\-- currentSession
\-- session(s)
    \-- name
    \-- filepath
    \-- publishData
    \--  person editing
    \-- editorState  =====>>

Editor
constructor ties to ref => Scribe.currentSession.editorState  <<======
\-- editorState
\-- currentCode
\-- saveState
... etc.

*/