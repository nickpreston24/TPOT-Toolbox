import localForage from 'localforage';
import { create, persist } from 'mobx-persist'

import { toJS, action } from 'mobx';
import { app } from '../firebase/firebase';

// RESPONSIBILITIES:
// Create, Update, Tweak and Destroy MobX store instances for each app
// Provide some methods that any app can use by calling their own, this.root

localForage.config({
    name: 'Toolbox',
    storeName: `MobX Persistent Storage`,
});

export default class MobxStore {
    constructor() {
        // Initial Properties
        this.root = this
        this.appNames = ['services', 'settings', 'letters', 'editor', 'session', 'auth']
        this.hydrate = create({ storage: localForage, jsonify: false })

        // Startup Scripts
        this.initialize()
    }

    @action initialize = () => {
        this.createFilesystems(['Temporary', 'User_Preferences', 'Access_Tokens'])
        // Check stores : choose to create or reload
        this.createNewStores(this.appNames)
        this.reloadStoresFromDisk(this.appNames)

        console.log(this.root)
    }

    @action createFilesystems = (storeNames) => {
        storeNames.forEach((storeName) => {
            if (!this[`${storeName}`]) { this[`${storeName}`] = {} }
            this[`${storeName}`] = localForage.createInstance({
                name: 'Toolbox',
                storeName: storeName,
            });
            this[`${storeName}`].setItem('dateCreated', new Date())
        })
    }

    // checkExistingStores

    @action createNewStores = (appNames) => {
        // console.log(`MOBX: Root Store Initialized`)
        appNames.forEach((appName) => {
            const resolvedStore = require(`./${appName}`)
            const storeConstructor = resolvedStore.default

            // Create and Instance of the Store to be used in the App
            this[`${appName}Store`] = new storeConstructor(this.root)

            // Have the Store Instance suscribe to persistant localforage
            this.hydrate(`${appName}Store`, this[`${appName}Store`], { clean: false })
            // if ( ['letters', 'editor'].includes(appName) ) {

            //     // Create and Instance of the Store to be used in the App
            //     this[`${appName}Store`] = new storeConstructor(this.root)
            //     console.log(appName, this[`${appName}Store`])

            //     // Have the Store Instance suscribe to persistant localforage
            //     this.hydrate(`${appName}Store`, this[`${appName}Store`], { clean: false })

            // } else {
            //     this[`${appName}Store`] = new storeConstructor(this.root)
            // }

            // console.log(`MOBX: Loaded new ${appName}Store Instance`)
        })
    }

    @action reloadStoresFromDisk = (appNames) => {
        appNames.forEach((appName) => {
            // console.log(`MOBX: Reloaded ${appName}Store from Disk`)
            // this.stores.getItem('letters').then(store => {
            //     console.log(store)
            // })
            // console.log(this.storage.stores[`${appName}`])
            // const resolvedStore = require(`./${appName}`)
            // const storeConstructor = resolvedStore.default
            // this[`${appName}Store`] = new storeConstructor(this.root)
            // console.log(`MOBX: Loaded new ${appName}Store`)
        })
    }


}