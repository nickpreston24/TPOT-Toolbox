import { action } from 'mobx';

// RESPONSIBILITIES:
// Create, Update, Tweak and Destroy MobX store instances for each app
// Provide some methods that any app can use by calling their own, this.root

export default class MobxStore {
    constructor() {
        this.appNames = ['services', 'settings', 'letters', 'editor', 'session', 'auth']
        this.init()
    }

    @action init = () => {
        this.reloadStore(this.appNames)
    }

    @action reloadStore = (string) => {
        const loadConstructor = (storeName) => {
            if (!this.appNames.includes(storeName)) return
            const resolvedStore = require(`./${storeName}`)
            const storeConstructor = resolvedStore.default
            this[`${storeName}Store`] = new storeConstructor(this)
            console.log(`Refreshed: ${storeName}Store`)
        }
        Array.isArray(string) ? string.forEach(string => loadConstructor(string)) : loadConstructor(string)
    }

}