import { observable, computed, action} from "mobx"
import { firebase } from '../firebase';
import { persist } from "mobx-persist";

export default class AuthStore {

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = this.rootStore.notify;
        
        firebase.app.auth().onAuthStateChanged((authUser) => {
//            console.log('authStateChanged', authUser)
        })
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