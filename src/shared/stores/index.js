import localForage from 'localforage';
import { create, persist } from 'mobx-persist'
import { toJS } from 'mobx';
import { app } from '../firebase/firebase';

class MobxStore {
    constructor() {
        // Initial Properties
        this.appNames = ['services', 'settings', 'letters', 'editor', 'session']
        // this.hydrate = create({ storage: localForage, jsonify: false })
        this.root = this

        // Startup Scripts
        this.initialize()
    }

    initialize = () => {
        this.createFilesystems(['stores', 'config', 'preferences'])
        // Check stores : choose to create or reload
        this.createNewStores(this.appNames)
        this.reloadStoresFromDisk(this.appNames)

        console.log(this.root)
    }

    createFilesystems = (storeNames) => {
        if (!this.storage) { this.storage = {} }
        storeNames.forEach((storeName) => {
            this.storage[`${storeName}`] = localForage.createInstance({
                name: 'Toolbox',
                storeName: storeName,
            });
            this.storage[`${storeName}`].setItem('dateCreated', new Date())
        })
    }

    // checkExistingStores

    createNewStores = (appNames) => {
        console.log(`MOBX: Root Store Initialized`)
        appNames.forEach((appName) => {
            const resolvedStore = require(`./${appName}`)
            const storeConstructor = resolvedStore.default
            this[`${appName}Store`] = new storeConstructor(this.root)

            let storeInstance = this[`${appName}Store`]
            let storeKeys = Object.keys(storeInstance)
            let hydrationConfig = {}
            storeKeys.forEach(storeKey => {
                let storeValue = toJS(storeInstance[storeKey])
                console.log(storeKey)
                console.log(storeValue)
                hydrationConfig[storeKey] = storeValue
            })
            console.log(hydrationConfig)
            const hydrate = create({ storage: localForage, jsonify: false })


            // hydrate(`${appName}`, this[`${appName}Store`])
            //     .then((store) => console.log('some hydrated letters', store))

            console.log(`MOBX: Loaded new ${appName}Store Instance`)
        })
    }

    reloadStoresFromDisk = (appNames) => {
        appNames.forEach((appName) => {
            console.log(`MOBX: Reloaded ${appName}Store from Disk`)
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

// const mobxStore = new MobxStore()

export default MobxStore