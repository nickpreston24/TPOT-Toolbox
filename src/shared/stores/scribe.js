import { action, observable, computed, toJS, reaction } from "mobx";
import { persist } from "mobx-persist";
import { serializable } from 'serializr'
import { EditorState, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { convertToRaw } from 'draft-js';
import { convertFile } from "../utilities/converter";
import EditorStore from './editor'
import { matchPath } from 'react-router'
import { draftContentToHtml } from "../../apps/Editor/utils/transforms";

export default class ScribeStore {

    @observable sessions = []
    @observable current = 0
    @observable session = null

    constructor(root) {
        this.root = root
        this.notify = this.root.lettersStore.notify
        this.init()
    }

    @action init = () => {
        // Create an inital empty document
        this.editorStore = new EditorStore(this.root, this)
        this.session = new Session(null, this)
    }

    @action createSession = async (file) => {
        // confirm('Clear the Editor?')
        if (file) {
            this.sessions.push(new Session(file, this))
            this.current = this.sessions.length - 1
            this.root.routing.push(`/scribe/${this.currentSession ? this.currentSession.name : 'Untitled.docx'}`)
        } else {
            this.session = new Session(null, this)
        }
        this.session.newFile()
    }

    @action saveSession = () => {
        this.session.saveFile()
    }

    @action clearSession = idx => {
        this.session.clearFile()
        this.session = new Session(null, this)
    }

    @action publishSession = () => {
        // Publish the code contents of this.currentSession.editorState [or this.editorStore.code]
        // this.session.editorState.code
    }

    @action loadSession= () => {
        // load a Draft editorState from IndexedDB
    }

    @action previewSession = () => {
        //  TBA
    }

    @action pushRoute = (path, history) => {
        history.push(`/scribe${path}`)
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
    @observable sessionStore = null
    @observable editorStore = null
    @observable editorState = createEditorStateWithText('Click to start typing a note...')

    constructor(file, sessionStore) {
        console.log('session created', file, sessionStore.sessions.length, toJS(sessionStore.currentSession))
        this.sessionStore = sessionStore
        this.editorStore = sessionStore.editorStore
        this.name = bumpName(file, this.sessionStore.sessions)
        if (file) this.convertFile(file)
    }

    @computed get code() {
        return draftContentToHtml(
            this.editorState,
            this.editorState.getCurrentContent()
        );
    }

    @action convertFile = async (file) => {
        await this.editorStore.convertFileToDraftState(file)
        // const routeName = this.sessionStore.currentSession.name
        // this.sessionStore.root.routing.push(`/scribe/${routeName}`)
        // this.current = this.sessionStore.setCurrentSession(this.name)
    }

    @action saveFile = () => {
        this.editorStore.saveSession()
    }

    @action clearFile = () => {
        this.editorStore.clearSession()
    }

    @action newFile = () => {
        this.editorStore.newSession()
    }

}

const bumpName = (file, collection) => {
    // This module has issues. Does not handle all cases. Needs to be recursive
    let filename = file ? file.name : 'Untitled.docx'
    const getVersionInfo = (filename) => {
        const VER_REGX = /(?:\(([\d]{1,3})\)){0,1}(\.docx)/g
        const matches = VER_REGX.exec(filename)
        const sample = matches[0]
        const version = matches[1] ? new Number(matches[1]) : 0
        const verString = version !== 0 ? `(${version})` : ''
        const length = filename.length - sample.length
        const name = filename.slice(0, length).replace(/\s/g, '-')
        return { matches, sample, version, verString, length, name }
    }
    const { name, version } = getVersionInfo(filename)
    filename = `${name}.docx`
    collection.forEach((value) => {
        if (value.name === filename) {
            filename = `${name}(${version + 1}).docx`
            collection.forEach((value) => {
                if (value.name === filename) {
                    const { name, version } = getVersionInfo(value.name)
                    filename = `${name}(${version + 1}).docx`
                }
            })
            // let duplicate = collection.some(value => value.name === filename)
            // if (duplicate) {
            //     const { name, version } = getVersionInfo(filename)
            //     filename = `${name}(${version + 2}).docx`
            // }
            // let secDuplicate = collection.some(value => value.name === filename)
            // if (secDuplicate) {filename = `${name}(${version + 1}).docx`}
        }
    })
    return filename
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