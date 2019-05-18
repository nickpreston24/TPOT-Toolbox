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
        this.services = new ServicesStore(this)
        // this.views = new SettingsStore(this)
        // this.data = new SettingsStore(this)
        this.settingsStore = new SettingsStore(this)
        this.lettersStore = new LettersStore(this)
        this.editorStore = new EditorStore(this)
        this.sessionStore = new SessionStore(this)
    }
}

// const mobxStore = new MobxStore()

export default MobxStore