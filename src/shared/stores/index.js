import localForage from 'localforage';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import { create } from 'mobx-persist'
import { action } from 'mobx';

// RESPONSIBILITIES:
// Create, Update, Tweak and Destroy MobX store instances for each app
// Provide some methods that any app can use by calling their own, this.root
const routingStore = new RouterStore();

localForage.config({ name: 'Toolbox', storeName: `MobX Persistent Storage` })

export default class MobxStore {
    constructor() {
        this.appNames = ['settings', 'letters', 'editor', 'session', 'auth', 'scribe']
        this.hydrate = create({ storage: localForage, jsonify: false })
        this.routing = routingStore
        this.init()
    }

    @action init = () => {
        this.reloadStore(this.appNames)
        console.log('MobX: ', this)
    }

    @action reloadStore = (string) => {
        const loadConstructor = (storeName) => {
            if (!this.appNames.includes(storeName)) return
            const resolvedStore = require(`./${storeName}`)
            const storeConstructor = resolvedStore.default
            this[`${storeName}Store`] = new storeConstructor(this) // Create an Instance of the Store to be used in the App
            this.hydrate(`${storeName}Store`, this[`${storeName}Store`], { clean: false }) // Have the Store Instance suscribe to persistant localforage
            console.log(`Refreshed: ${storeName}Store`)
        }
        Array.isArray(string) ? string.forEach(string => loadConstructor(string)) : loadConstructor(string)
    }

}