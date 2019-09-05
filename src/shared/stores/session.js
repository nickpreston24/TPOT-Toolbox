import { observable, action, decorate, runInAction } from 'mobx'
import { db, auth, firebase } from '../firebase'
import { persist } from 'mobx-persist';

// const electron = window.require('electron')
// const remote = electron.remote
// const app = remote.app
// const fs = remote.require('fs')
// const path = remote.require('path')

export default class SessionStore {

    @observable enqueueSnackbar = null
    @observable closeSnackbar = null

    constructor(rootStore) {
        this.rootStore = rootStore
//        console.log(rootStore)
        this.notify = rootStore.servicesStore.notify
        // this.auth = auth;

//        console.log('SessionStore() => auth loaded? ', !!auth && auth);
//        console.log('SessionStore() => auth user loaded? ', !!auth.authUser && auth.authUser);

        // : Set Listeners
        firebase.auth.onAuthStateChanged((authUser) => {
//            console.log('onAuthStateChanged() => authUser:', authUser)
        })

        // : Load Initial Configuration from File
        // : TODO
        // fs.readFile(path.join(app.getPath('userData'), 'Local Storage', 'auth.json'), 'utf-8', (error, data) => {
        //     if (!!data) {
        //         this.setAuthUser(JSON.parse(data).authUser)
        //         console.log(JSON.parse(data))
        //     }
        // });
    }

    @persist @observable clean = true
    @persist @observable authUser = null
    @observable sessionName = "Welcome. Start typing a letter or load one from file."
    @observable loginMode = 'login'
    @observable loginData = {
        firstName: '',
        lastName: '',
        initials: '',
        email: '',
        password: '',
        confirmPassword: '',
        code: '',
        codeSent: false,
    }

    @action setKey = (key, value) => {
        this[key] = value
    }

    @action.bound async signIn() {
//        console.log('sign in')
        try {
            const { email, password } = this.loginData
            const authUser = await auth.signIn(email, password)
            runInAction(() => {
                this.authUser = authUser
//                console.log(this.authUser)
                // setCurrentModal(null)
            })
        } catch (error) {
            console.error(error)
            console.error('error', this)
            this.notify(error.message, { variant: 'error', autoHideDuration: 3000 })
        }
    }

    @action.bound async requestReset() {
        try {
            await auth.requestPasswordReset(this.loginData.email)
                .then(() => {
                    this.setKey('loginMode', 'login')
                    this.notify(`Password Reset Request Sent to ${this.loginData.email}`, { variant: 'success', autoHideDuration: 3000 })
                })
        } catch (error) {
            this.notify(error.message, { variant: 'error', autoHideDuration: 3000 })
        }
    }

    @action.bound async register() {
        try {
            const { firstName, lastName, email, password } = this.loginData
            if (!lastName) {
                this.notify('Please enter a Last Name', { variant: 'error', autoHideDuration: 3000 })
            }
            if (!firstName) {
                this.notify('Please enter a First Name', { variant: 'error', autoHideDuration: 3000 })
            }
            if (firstName && lastName) {
                const userCredential = await auth.createUser(email, password)
                const docRef = db.createProfile(firstName, lastName, userCredential)
                if (docRef) {
                    this.notify('Account Created! Try to Sign In now...', { variant: 'success', autoHideDuration: 5000 })
                }
            }
        } catch (error) {
            this.notify(error.message, { variant: 'error', autoHideDuration: 3000 })
        }
    }

    @action signOut = (setCurrentModal) => {
        auth.signOut()
        this.authUser = null
        setCurrentModal(null)
    }

    @action setAuthUser = authUser => {
        this.authUser = authUser
    }

    @action setLoginData = (key, value) =>
        this.loginData[key] = value

    @action setNotifyFunctions = (functions) => {
        const { enqueueSnackbar, closeSnackbar } = functions
        this.enqueueSnackbar = enqueueSnackbar
        this.closeSnackbar = closeSnackbar
//        console.log('Notification enabled.', this.enqueueSnackbar, this.closeSnackbar)
    }


}
