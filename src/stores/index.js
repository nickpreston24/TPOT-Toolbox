import ServicesStore from './services';

// configure({ enforceActions: "observed" })

class MobxStore {
    constructor() {
        this.root = this
        // this.preferences = new SettingsStore(this)
        this.services = new ServicesStore(this)
        // this.views = new SettingsStore(this)
        // this.data = new SettingsStore(this)
    }
}

// const mobxStore = new MobxStore()

export default MobxStore