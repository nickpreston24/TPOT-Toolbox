import { observable, computed, action, decorate, configure } from "mobx"
import { auth, app, firebase } from '../firebase';
import { persist } from "mobx-persist";
import * as credentials from './wp-credentials';

export default class AuthStore {

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = this.rootStore.lettersStore.notify

        firebase.app.auth().onAuthStateChanged((user) => {

            user.getIdToken()
                .then(response =>
                    console.log('getIdToken():', response)
                );

            console.log('authStateChanged():\n')
            console.log('user authenticated?', !!user)
            console.log('refresh token: ', user.refreshToken)
        })
    }

    @persist @observable clean = true
    @observable authUser = null
    @observable wordpressCredentials = credentials

    @computed get fullCreds() {
        return `${this.wordpressCredentials.username}${this.wordpressCredentials.password}`
    }

    @action tick() {
        this.authUser = Date.now();
    }

}