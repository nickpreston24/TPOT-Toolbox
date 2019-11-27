import { EditorState } from "draft-js";
import { action, observable, toJS } from 'mobx';
import { convertToRaw } from 'draft-js';
import { persist } from 'mobx-persist'
import { db } from '../firebase';
import { wp } from '../wordpress';

// : Anything that  uses @persist will be automatically subscribed to offline localforage storage

// Text input cannot be null or be whitespace but **can contain whitespace**.
const isNullOrWhitespace = (input) => {
    if (typeof input === 'undefined' || input == null)
        return true;
    return input.replace(/\s/g, '').length < 1;
}

// Title and slugs must contain NO Whitespaces and must NOT be null or empty
const isValidField = (input) => !isNullOrWhitespace(input) && !input.includes(" ")

class PublishData {
    @observable slug = ''
    @observable title = ''
    @observable excerpt = ''
}

export default class LettersStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        // this.notify = () => {}
        // this.notify = rootStore ? rootStore.servicesStore.notify : () => { }
    }

    @persist @observable clean = true
    @persist @observable authUser = null
    @observable notification = {
        message: '',
        config: {}
    }
    @persist @observable publishModal = false
    @observable wordpressCredentials = {
        username: '',
        password: ''
    }
    @persist @observable codeState = ''
    @persist @observable originalState = ''
    @persist @observable currentModal = ''
    @persist @observable editorContent = '<p>Why hello there!</p>'
    @observable editedState = EditorState.createEmpty() // TODO : Persist
    // @persist('object', PublishData) @observable publishData = new PublishData({ title: '', slug: '', title: '' })
    @observable publishData = new PublishData({ title: '', slug: '', title: '' })

    @action setKey = (key, value) => {
        this[key] = value
    }

    @action setEditorContent = async (string) => {
        console.log('SetEditorContent()===>', string)
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
        this.publishData[key] = value.trim()
    }

    // @action notify = (message, config) => {
    //     try {
    //         const data = { message, config: { ...config } }
    //         console.log(data)
    //         console.log(toJS(data))
    //         console.log(JSON.stringify(data))
    //         this.notification = JSON.stringify(data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     // console.log(`%c${message}`, `color: dodgerblue; font-size: 14px; border: 1px solid dodgerblue; background: #092b4c;`)
    // }

    @action setCurrentModal = (string) => {
        this.currentModal = string
    }

    @action togglePublishModal = () => {
        this.publishModal = !this.publishModal
    }

    @action.bound setWordpressCredentials = (credentials) => {
        let wordpressCredentials = toJS(credentials)
        this.wordpressCredentials.username = !!wordpressCredentials ? wordpressCredentials.username : ''
        this.wordpressCredentials.password = !!wordpressCredentials ? wordpressCredentials.password : ''
    }

    @action.bound async publishToWordpress(html) {
        db.getWordpressCredentials
            .then((wpCreds) => {

                this.setWordpressCredentials(wpCreds)

                let username = toJS(this.wordpressCredentials).username
                let password = toJS(this.wordpressCredentials).password

                if (!username || !password) {
                    this.notify('Could not Publish! Please log in again to TPOT Cloud',
                        { variant: 'error', autoHideDuration: 5000 });
                    return;
                }

                const { slug, title, excerpt } = this.publishData

                if (!isValidField(slug)) {
                    this.notify('Could not Publish! Please enter a valid slug',
                        { variant: 'error', autoHideDuration: 3000 });
                    return;
                }

                if (!isValidField(title)) {
                    this.notify('Could not Publish! Please enter a valid title',
                        { variant: 'error', autoHideDuration: 3000 })
                    return;
                }

                wp.createPage(this.wordpressCredentials, {
                    content: html,
                    slug,
                    title,
                    excerpt
                }, this.notify)

            })
            .catch(console.log)
    }   

}