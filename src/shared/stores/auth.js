import { observable, computed, action } from "mobx"
import { firebase } from '../firebase';
import { persist } from "mobx-persist";
import { findBadProps } from "../utilities/debug";

export default class AuthStore {

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = this.rootStore.lettersStore.notify

        firebase.app.auth().onAuthStateChanged(() => {
            //console.log('authStateChanged', authUser)
        })
        
        findBadProps(this, 'auth.js')
    }

    @persist @observable clean = true
    @observable authUser = null
    @observable wordpressCredentials = {
        username: "braden",
        password: "password"
    }

    @computed get fullCreds() {
        return `${this.wordpressCredentials.username}${this.wordpressCredentials.password}`
    }

    @action tick() {
        this.authUser = Date.now();
    }

}