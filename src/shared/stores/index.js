import localForage from 'localforage';
import { RouterStore } from 'mobx-react-router';
import { create } from 'mobx-persist'
import { action } from 'mobx';
import SettingsStore from './settings';
import LettersStore from './letters';
import EditorStore from './editor';
import SessionStore from './session';
import AuthStore from './auth';
import ScribeStore from './scribe';
import ServicesStore from './services';
import { findBadProps } from '../utilities/debug';

// RESPONSIBILITIES:
// Create, Update, Tweak and Destroy MobX store instances for each app
// Provide some methods that any app can use by calling their own, this.root
const routingStore = new RouterStore();

localForage.config({ name: 'Toolbox', storeName: `MobX Persistent Storage` })

export default class MobxStore {
    constructor() {
        this.appNames = ['services', 'settings', 'letters', 'editor', 'session', 'auth', 'scribe']
        this.hydrate = create({ storage: localForage, jsonify: false })
        this.routing = routingStore
        this.init()

        findBadProps(this, 'stores/index.js')
    }

    @action init = () => {
        this.servicesStore = new ServicesStore(this)
        this.settingsStore = new SettingsStore(this)
        this.lettersStore = new LettersStore(this)
        this.editorStore = new EditorStore(this)
        this.sessionStore = new SessionStore(this)
        this.authStore = new AuthStore(this)
        this.scribeStore = new ScribeStore(this)
    }
}