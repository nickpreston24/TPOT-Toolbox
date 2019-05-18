import { observable, computed, action, decorate, configure} from "mobx"
import { auth } from '../firebase';
configure({enforceActions: true})

class AuthStore {
    authUser = null
    wordpressCredentials = {
        username: "braden",
        password: "password"
    }

    constructor(rootStore) {
        this.rootStore = rootStore

        auth.onAuthStateChanged((authUser) => {
            console.log('authStateChanged', authUser)
        })
    }

    get fullCreds() {
        return `${this.wordpressCredentials.username}${this.wordpressCredentials.password}`
    }

    tick() {
        this.authUser = Date.now();
    }

}

let authStore = decorate(AuthStore, {
    authUser: observable,
    wordpressCredentials: observable,
    fullCreds: computed,
    tick: action,
})

export {
    authStore,
}