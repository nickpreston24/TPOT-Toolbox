import { observable, computed, action, decorate, configure} from "mobx"
import { auth, app, firebase } from '../firebase';
import { persist } from "mobx-persist";

export default class ScribeStore {

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = this.rootStore.lettersStore.notify

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