import { EditorState } from "draft-js";
import { action, decorate, observable } from 'mobx';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { create, persist } from 'mobx-persist'
import { db } from '../firebase';
import { wp } from '../wordpress';

// : Anything that  uses @persist will be automatically subscribed to offline localforage storage

class PublishData {
    @persist @observable  slug = ''
    @persist @observable title = ''
    @persist @observable  excerpt = ''
}

class LettersStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @persist @observable clean = true
    @persist @observable authUser = null
    @persist @observable notification = null
    @persist @observable publishModal = false
    @persist @observable wordpressCredentials = null
    @persist @observable codeState = ''
    @persist @observable originalState = ''
    @persist @observable currentModal = ''
    @persist @observable editorContent = '<p>Why hello there!</p>'
    @observable editedState = EditorState.createEmpty() // TODO : Persist
    @persist('object', PublishData) @observable publishData = new PublishData({title: '', slug: '', title: ''})

    @action setKey = (key, value) => {
        this[key] = value
    }

    @action setEditorContent = async (string) => {
        this.editorContent = string
    }

    @action clearEditor = () => {
        const editedState = convertToRaw(EditorState.createEmpty().getCurrentContent())
        this.editedState = editedState
        this.notify('Cleared Editor')
    }

    @action setEditorState = (string, state) => {
        this[`${string}State`] = state
    }

    @action setPublishData = (key, value) => {
        this.publishData[key] = value
    }

    @action notify = (message, config) => {
        const data = JSON.stringify({ message, config: { ...config } })
        this.notification = { data }
        console.log(`%c${message}`, `color: dodgerblue; font-size: 14px; border: 1px solid dodgerblue; background: #092b4c;`)
    }

    @action setCurrentModal = (string) => {
        this.currentModal = string
    }

    @action togglePublishModal = () => {
        this.publishModal = !this.publishModal
    }

    @action publishToWordpress = async (html) => {
        console.log('clicked')
        const wpCreds = await db.wordpressCredentials
        this.wordpressCredentials = !!wpCreds
            ? wpCreds
            : null
        console.log(this.wordpressCredentials)
        if (!!this.wordpressCredentials) {
            const { slug, title, excerpt } = this.publishData
            if (!slug) {
                this.notify('Could not Publish! Please enter a slug', { variant: 'error', autoHideDuration: 3000 })
            }
            if (!title) {
                this.notify('Could not Publish! Please enter a title', { variant: 'error', autoHideDuration: 3000 })
            }
            if (slug && title) {
                wp.createPage(this.wordpressCredentials, {
                    content: html,
                    slug,
                    title,
                    excerpt
                }, this.notify)
            }
        } else {
            this.notify('Could not Publish! Please log in again to TPOT Cloud', { variant: 'error', autoHideDuration: 5000 })
        }
    }

}

export default decorate(
    LettersStore, {
        // authUser: observable,
        // notification: observable,
        // publishModal: observable,
        // publishData: observable,
        // editedState: observable,
        // currentModal: observable,
        // setPublishData: action,
        // togglePublishModal: action,
        // setCurrentModal: action,
        // saveEditorState: action,
        // setEditorState: action,
        // clearEditor: action,
        // notify: action,
        // setKey: action,
        // signIn: action.bound,
        // signOut: action,
    })
// Don't make store variables observable if you want to keep them private to this class