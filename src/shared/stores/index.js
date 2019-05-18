import ServicesStore from './services';

import SessionStore from './session'
import SettingsStore from './settings'
import LettersStore from './letters'
import EditorStore from './editor'

// configure({ enforceActions: "observed" })

class MobxStore {
    constructor() {
        this.root = this
        // this.preferences = new SettingsStore(this)
        this.services = new ServicesStore(this.root)
        // this.views = new SettingsStore(this)
        // this.data = new SettingsStore(this)
        this.settingsStore = new SettingsStore(this.root)
        this.lettersStore = new LettersStore(this.root)
        this.editorStore = new EditorStore(this.root)
        this.sessionStore = new SessionStore(this.root)
    }
}

// const mobxStore = new MobxStore()

export default MobxStore