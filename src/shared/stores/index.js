import localForage from 'localforage';
import { create, persist } from 'mobx-persist'

import { toJS } from 'mobx';
import { app } from '../firebase/firebase';

localForage.config({
    name: 'Toolbox',
    storeName: 'MobX Persistent Storage',
});

class MobxStore {
    constructor() {
        // Initial Properties
        this.root = this
        this.appNames = ['services', 'settings', 'letters', 'editor', 'session']
        this.hydrate = create({ storage: localForage, jsonify: false })

        // Startup Scripts
        this.initialize()
    }

    initialize = () => {
        this.createFilesystems(['Temporary', 'User Preferences', 'Access Tokens'])
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
            if ( ['letters'].includes(appName) ) {
                // this[`lettersStore`] = new storeConstructor(this.root)
                console.warn('_')

                // Create the Store for Use in App
                this[`${appName}Store`] = new storeConstructor(this.root)

                console.log(this.lettersStore.editedState)

                // Have the Store Instance suscribe to persistant localforage
                this.hydrate(`${appName}Store`, this[`${appName}Store`], { clean: false })

                // let storeInstance = this[`lettersStore`]
                // let storeKeys = Object.keys(this[`lettersStore`])
                // let storeContents = {}
                // storeKeys.forEach(storeKey => {
                //     let storeValue = toJS(storeInstance[storeKey])
                //     storeContents[`${storeKey}`] = storeValue
                //     console.log(storeKey, storeValue)
                //     this.hydrate(`${appName}Store`, this[`${appName}Store`], {
                //         ...storeContents,
                //         // [`${storeKey}`]: storeValue,
                //         currentModal: 'PublishScreen',
                //     })
                //     // this.hydrate(`${appName}Store`, {[`${storeKey}`]: storeValue}, )
                // })
                // console.log("BP", storeContents)
                // this.hydrate(`${appName}Store`, this[`${appName}Store`], {
                //     ...storeContents,
                //     // [`${storeKey}`]: storeValue,
                //     currentModal: 'PublishScreen',
                // })
                //     // post hydration
                //     .then((store) => console.log('some hydrated letters', store))

                // Subscribe Initial Store Values to LocalForage

                // this.hydrate(`${appName}Store`, this[`${appName}Store`], {
                //     ...storeContents,
                //     ref: this[`${appName}Store`]
                //     // currentModal: 'PublishScreen',
                // })
                //     // post hydration
                //     .then((store) => console.log('some hydrated letters', store))
            } else {
                this[`${appName}Store`] = new storeConstructor(this.root)
            }
            // let storeInstance = toJS(this[`${appName}Store`])
            // let stores = localForage.createInstance({
            //     name: 'Toolbox',
            //     storeName: 'stores',
            // })
            // stores.setItem(`${appName}`, 'kittens')
            //             // let storeState = {}
            // let storeKeys = Object.keys(this[`${appName}Store`])
            // let storeData = {}
            // storeKeys.forEach(key => {
            //     const storeInstance = this[`${appName}Store`]
            //     const value = toJS(storeInstance[key])
            //     console.log(`MB: ${key}`, value, typeof value)
            //     if (typeof value !== 'function' && key !== 'root') {
            //         console.warn('_')
            //         storeData[key] = value
            //         // storeInstance[key] = null
            //         // stores.getItem(`${appName}`).then(storeContents => {
            //         //     console.log('CT:', storeContents)
            //         //     if (!storeContents) {
            //         //         stores.setItem(`${appName}`, {}).then(()=> {
            //         //             storeContents = {...storeContents , [`${key}`]: value}
            //         //             stores.setItem(`${appName}`, storeContents)
            //         //         })
            //         //     } else {
            //         //         storeContents = {...storeContents , [`${key}`]: value}
            //         //         stores.setItem(`${appName}`, storeContents)
            //         //     }
            //         // })
            //     }
            // })
            // console.log(storeData)
            // stores.setItem(`${appName}`, storeData)
            // console.log(storeInstance)
            // // stores.setItem(`${appName}`, storeInstance)
            // console.log(storeInstance)
            // if (!this.storage.stores) {
            //     this.storage.stores = localForage.createInstance({
            //         name: 'Toolbox',
            //         storeName: 'stores',
            //     })
            // }
            // console.log(storeState)

            // this.storage.stores
            //     .setItem(`${appName}`, storeState)
            //     .then(store => {
            //         console.log(store)
            //     })
            // console.log()
            // this.storage.stores.setItem('test', 'test')
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