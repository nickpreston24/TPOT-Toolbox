import { EditorState } from "draft-js";
import { action, decorate, observable } from 'mobx';
import { create, persist } from 'mobx-persist'
import { db } from '../firebase';
import { wp } from '../wordpress';

class LettersStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    authUser = null
    originalState = ''
    editedState = EditorState.createEmpty()
    codeState = ''
    wordpressCredentials = {}
    editorContent = '<p>Why hello there!</p>'
    publishModal = false
    @persist @observable currentModal = ''
    publishData = {
        slug: '',
        title: '',
        excerpt: '',
    }
    notification = null

    setKey = (key, value) => {
        this[key] = value
    }

    setEditorContent = async (string) => {
        this.editorContent = string
    }

    clearEditor = () => {
        const editedState = EditorState.createEmpty()
        this.editedState = editedState
        this.notify('Cleared Editor')
    }

    setEditorState = (string, state) => {
        this[`${string}State`] = state
    }

    setPublishData = (key, value) => {
        this.publishData[key] = value
    }

    // saveSession = () => {
    //     console.log('saved')
    //     draft.saveSession(this.originalState, this.editedState, this.codeState)
    //     this.notify('Document Saved to Disk Successfully', {
    //         variant: 'success',
    //     })
    // }

    notify = (message, config) => {
        const data = JSON.stringify({ message, config: { ...config } })
        this.notification = { data }
        console.log(`%c${message}`, `color: dodgerblue; font-size: 14px; border: 1px solid dodgerblue; background: #092b4c;`)
    }

    setCurrentModal = (string) => {
        this.currentModal = string
    }

    togglePublishModal = () => {
        this.publishModal = !this.publishModal
    }

    publishToWordpress = async (html) => {
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
        authUser: observable,
        notification: observable,
        publishModal: observable,
        publishData: observable,
        editedState: observable,
        // currentModal: observable,
        setPublishData: action,
        togglePublishModal: action,
        setCurrentModal: action,
        saveEditorState: action,
        setEditorState: action,
        clearEditor: action,
        notify: action,
        setKey: action,
        signIn: action.bound,
        signOut: action,
    })
// Don't make store variables observable if you want to keep them private to this class