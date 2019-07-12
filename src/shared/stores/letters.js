import { EditorState } from "draft-js";
import { action, decorate, observable, runInAction, toJS } from 'mobx';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { create, persist } from 'mobx-persist'
import { db } from '../firebase';
import { wp } from '../wordpress';
import { isPrimitive } from "util";

// : Anything that  uses @persist will be automatically subscribed to offline localforage storage

class PublishData {
    // @persist @observable slug = ''
    // @persist @observable title = ''
    // @persist @observable excerpt = ''
    @observable slug = ''
    @observable title = ''
    @observable excerpt = ''
}

export default class LettersStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = rootStore ? rootStore.servicesStore.notify : () => {}
    }

    @persist @observable clean = true
    @persist @observable authUser = null
    @persist @observable notification = {
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
        console.log('recieved', credentials)
        console.log(typeof credentials)
        console.log(typeof toJS(credentials))
        console.log(isPrimitive(toJS(credentials)))
        console.log(isPrimitive(credentials))
        let wordpressCredentials = toJS(credentials)
        this.wordpressCredentials.username = !!wordpressCredentials ? wordpressCredentials.username : ''
        this.wordpressCredentials.password = !!wordpressCredentials ? wordpressCredentials.password : ''
        console.log(toJS(this.wordpressCredentials))
        // this.wordpressCredentials = !!wordpressCredentials
        // ? wordpressCredentials
        // : null
        // if (isPrimitive(toJS(credentials))) {
        //     this.wordpressCredentials = toJS(credentials)
        // }
        // // this.wordpressCredentials = !!credentials
        // // ? credentials
        // // : null
        // console.log(this.wordpressCredentials)
    }

    @action.bound async publishToWordpress(html) {
        console.log('submit')
        // const wpCreds = await db.wordpressCredentials
        db.getWordpressCredentials
            .then((wpCreds) => {
                // console.log('firstcreds', wpCreds)
                try {
                    this.setWordpressCredentials(wpCreds)
                    console.log(toJS(this.wordpressCredentials))

                    let username = toJS(this.wordpressCredentials).username
                    let password = toJS(this.wordpressCredentials).password

                    if (username && password) {
                        console.log(username,password)
                        const { slug, title, excerpt } = this.publishData
                        console.log({"slug": slug, "title": title, "excerpt": excerpt})
                        if (slug === '') {
                            console.log('bad slug')
                            this.notify('Could not Publish! Please enter a slug', { variant: 'error', autoHideDuration: 3000 })
                        }
                        if (title === '') {
                            this.notify('Could not Publish! Please enter a title', { variant: 'error', autoHideDuration: 3000 })
                        }
                        if (slug !== '' && title !== '') {
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

                    // if (!!this.wordpressCredentials) {
                    //     const { slug, title, excerpt } = this.publishData
                    //     if (slug === '') {
                    //         console.log('bad slug')
                    //         this.notify('Could not Publish! Please enter a slug', { variant: 'error', autoHideDuration: 3000 })
                    //     }
                    //     if (title  === '') {
                    //         this.notify('Could not Publish! Please enter a title', { variant: 'error', autoHideDuration: 3000 })
                    //     }
                    //     if (slug  === '' && title  === '') {
                    //         wp.createPage(this.wordpressCredentials, {
                    //             content: html,
                    //             slug,
                    //             title,
                    //             excerpt
                    //         }, this.notify)
                    //     }
                    // } else {
                    //     console.log('bad notify')
                    //     this.notify('Could not Publish! Please log in again to TPOT Cloud', { variant: 'error', autoHideDuration: 5000 })
                    // }

                } catch (error) {
                    console.log(error)
                }

            })
            .catch(error => {

            })

        // console.log('creds')
        // this.wordpressCredentials.username = toJS(wpCreds).username
        // this.setWordpressCredentials(wpCreds)

        // runInAction(() =>{
        //     this.wordpressCredentials = !!wpCreds
        //     ? wpCreds
        //     : null
        //     // console.log(this.wordpressCredentials)
        // })
        // this.setWordpressCredentials(wpCreds)
        // if (!!this.wordpressCredentials) {
        //     const { slug, title, excerpt } = this.publishData
        //     if (!slug) {
        //         this.notify('Could not Publish! Please enter a slug', { variant: 'error', autoHideDuration: 3000 })
        //     }
        //     if (!title) {
        //         this.notify('Could not Publish! Please enter a title', { variant: 'error', autoHideDuration: 3000 })
        //     }
        //     if (slug && title) {
        //         wp.createPage(this.wordpressCredentials, {
        //             content: html,
        //             slug,
        //             title,
        //             excerpt
        //         }, this.notify)
        //     }
        // } else {
        //     this.notify('Could not Publish! Please log in again to TPOT Cloud', { variant: 'error', autoHideDuration: 5000 })
        // }
    }

}