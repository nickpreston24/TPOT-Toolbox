import { observable, action, decorate, runInAction } from 'mobx'
import { db, auth, firebase } from '../firebase'

// const electron = window.require('electron')
// const remote = electron.remote
// const app = remote.app
// const fs = remote.require('fs')
// const path = remote.require('path')

class SessionStore {

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = rootStore.lettersStore.notify

        // : Set Listeners
        // firebase.auth.onAuthStateChanged((authUser) => {
        //     console.log('authStateChanged', authUser)
        // })

        // : Load Initial Configuration from File
        // : TODO
        // fs.readFile(path.join(app.getPath('userData'), 'Local Storage', 'auth.json'), 'utf-8', (error, data) => {
        //     if (!!data) {
        //         this.setAuthUser(JSON.parse(data).authUser)
        //         console.log(JSON.parse(data))
        //     }
        // });

    }

    authUser = null
    sessionName = "Welcome. Start typing a letter or load one from file."
    loginMode = 'login'
    loginData = {
        firstName: '',
        lastName: '',
        initials: '',
        email: '',
        password: '',
        confirmPassword: '',
        code: '',
        codeSent: false,
    }

    setKey = (key, value) => {
        this[key] = value
    }

    async signIn(notify, setCurrentModal) {
        console.log('sign in')
        try {
            const { email, password } = this.loginData
            const authUser = await auth.signIn(email, password)
            runInAction(() => {
                this.authUser = authUser
                console.log(this.authUser)
                // setCurrentModal(null)
            })
        } catch (error) {
            this.notify(error.message, { variant: 'error', autoHideDuration: 3000 })
        }
    }

    async requestReset(notify) {
        try {
            await auth.requestPasswordReset(this.loginData.email)
                .then(() => {
                    this.setKey('loginMode', 'login')
                    notify(`Password Reset Request Sent to ${this.loginData.email}`, { variant: 'success', autoHideDuration: 3000 })
                })
        } catch (error) {
            notify(error.message, { variant: 'error', autoHideDuration: 3000 })
        }
    }

    async register(notify, setCurrentModal) {
        try {
            const { firstName, lastName, email, password } = this.loginData
            if (!lastName) {
                notify('Please enter a Last Name', { variant: 'error', autoHideDuration: 3000 })
            }
            if (!firstName) {
                notify('Please enter a First Name', { variant: 'error', autoHideDuration: 3000 })
            }
            if (firstName && lastName) {
                const userCredential = await auth.createUser(email, password)
                const docRef = db.createProfile(firstName, lastName, userCredential)
                if (docRef) {
                    notify('Account Created! Waiting Admin Approval...', { variant: 'success', autoHideDuration: 5000 })
                }
            }
        } catch (error) {
            notify(error.message, { variant: 'error', autoHideDuration: 3000 })
        }
    }

    signOut = (setCurrentModal) => {
        auth.signOut()
        this.authUser = null
        setCurrentModal(null)
    }

    setAuthUser = authUser => {
        this.authUser = authUser
    }

    setLoginData = (key, value) =>
        this.loginData[key] = value
}

export default decorate(
    SessionStore, {
        loginMode: observable,
        loginData: observable,
        authUser: observable,
        sessionName: observable,
        setKey: action,
        setAuthUser: action,
        signIn: action,
        register: action.bound,
        requestReset: action.bound,
        signOut: action,
        setLoginData: action,
    })