import { action, observable, computed, toJS } from "mobx";
import { persist } from "mobx-persist";
import { serializable } from 'serializr'
import { EditorState, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { convertToRaw } from 'draft-js';
import { convertFile } from "../utilities/converter";
import EditorStore from './editor'
import { draftContentToHtml } from "../../apps/Editor/utils/transforms";

export default class ScribeStore {

    @observable sessions = []
    @observable current = 0

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = this.rootStore.lettersStore.notify
        this.editorStore = new EditorStore(this.rootStore, this)
        this.sessions.push(new Session(null, this))
        // if(this.sessions.length -1 === 0) this.createSession()
    }

    @action createSession = (file) => {
        console.log('create new')
        console.log(this.current, this.sessions, this.sessions.length, this.sessions.length - 1)
        let sessionLength = this.sessions.length
        if (sessionLength < 1) {
            console.log('TA: create first session')
            this.current = 0
        } else if (sessionLength = 1) {
            console.log('TA: only one session')
            this.current = 0
        } else {
            console.log('TA: there are many sessions')
        }
        this.sessions.push(new Session(file, this))
        this.current = this.sessions.length - 1
        // this.current = this.sessions.length < 0 ? this.sessions.length - 1 : 0
        // console.log(this.current)/
        if (this.history) this.history.push(`/scribe/${this.currentSession.name}`)
    }

    @action saveSession = () => {
        // Forcefully hydrate the persisted data using the root store's hydrate function
    }

    @action closeSession = idx => {
        // this.session = new Session(null, this.editorStore)
        // this.editorStore.suscribe(this.session)
        // let remove = !!idx ? idx : this.sessions.length ? this.sessions.length - 1 : this.current ? this.current: 0
        console.log('idx', idx, this.current, this.sessions.length)
        // THIS FUNCTION IS NOT REMOVING THE LAST REMAINING SESSION EVERY TIME
        if (!!idx) {
            this.current = idx
            return
        }
        this.sessions = this.sessions.filter((value, index, arr) => {
            console.log(value, index, arr)
            if (index !== this.current - 1) {
                return value
            }
        })
        let remove = this.current - 1
        // if (remove < 1) {
        //     this.history.push(`/scribe`)
        //     remove = 0
        // }
        this.current = this.sessions.length - 1
        // this.editorStore.suscribe(this.sessions[remove + 1])
        console.log(remove, toJS(this.sessions))
        // delete the current session in this.sessions[] and set this.currentSession to be one index back or forward
    }

    @action clearSession = idx => {
        // pull up the session info, like the file reference and create a new Session(fileReference) to refresh completely.
    }

    @action setCurrentSession = index => {
        console.log("Set Session to: ", index)
        this.current = index
        // if (index) {
        //     this.current = index
        // }
        // const currentIndexes = []
        // this.sessions.forEach((value, index, arr) =>  {
        //     if (value.name === name) currentIndexes.push(index)
        // })
        // console.log("BAD", currentIndexes, currentIndexes.pop())
        // this.current = currentIndexes.length !== 0 ? currentIndexes.pop() + 1 : this.current
    }

    @action routeSession = (prevMatch, nextMatch) => {
        console.log("Set Session to: ", prevMatch, nextMatch)
        // if (this.sessions.length === 0) {
        //     this.sessions.push(new Session(null, this))
        //     this.current = 0
        // }
        // this.current = 0
        // if (index) {
        //     this.current = index
        // }
        // const currentIndexes = []
        // this.sessions.forEach((value, index, arr) =>  {
        //     if (value.name === name) currentIndexes.push(index)
        // })
        // console.log("BAD", currentIndexes, currentIndexes.pop())
        // this.current = currentIndexes.length !== 0 ? currentIndexes.pop() + 1 : this.current
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
        return this.sessions[this.current]
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
        // this.current = this.sessionStore.setCurrentSession(this.name)
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