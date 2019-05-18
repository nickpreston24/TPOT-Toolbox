import React from 'react';
import { action, observable } from 'mobx';
import { Button } from '@material-ui/core';
import { Workbox } from 'workbox-window';

const rest = (ms) => {
    return new Promise(r => setTimeout(r, ms));
}

// : Get a max timeout clock to guarenteed consistent loading screen times
let loaderStartTime = Date.now();
let loadTimeRemaining = 0
let loaderCounter = setInterval(function () {
    loadTimeRemaining = 1500 - (Date.now() - loaderStartTime).toFixed(3)
}, 100);
setTimeout(() => clearInterval(loaderCounter), 1000)

// : Main Class. Manages service-related UI state, notifications and the registration of service workers.
export default class ServicesStore {

    @observable enqueueSnackbar = null
    @observable closeSnackbar = null
    @observable initialWorker = null
    @observable loader = false

    constructor(rootStore) {

        // : Reference the parent store
        this.root = rootStore

        // : Turn loader on with max (other events dictate when it will turn off)
        
        // : Register & Monitor Service Worker
        if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
            this.setKey('loader', true)
            this.wb = new Workbox(`${process.env.PUBLIC_URL}/service-worker.js`)

            // : Check to see if we are the initial service worker and pass the result to the current SW to store
            navigator.serviceWorker.getRegistrations().then(registrations => {
                const initialWorker = !registrations.length
                this.wb.messageSW({ type: 'SET_INITIAL', payload: initialWorker })
            })

            // : Check our refresh and initial worker to set the loading screen and update status
            this.wb.messageSW({ type: 'GET_REFRESHED' }).then(data => {
                this.refreshed = data.payload.refreshed
                this.initialWorker = data.payload.initialWorker
                rest(loadTimeRemaining).then(() => {
                    if (this.refreshed) {
                        rest(1500).then(() => {
                            this.setKey('loader', false)
                            if (this.initialWorker) {
                                this.notify('App can now be used offline!', { variant: 'success' })
                            } else {
                                this.notify('App updated successfully!', { variant: 'success' })
                            }
                        })
                    } else {
                        this.setKey('loader', false)
                    }
                })
            })

            // : An updated service worker was installed, set a key to notify the user on the next refresh
            this.wb.addEventListener('installed', (event) => {
                if (event.isUpdate) {
                    this.wb.messageSW({ type: 'SET_REFRESHED', payload: true })
                    this.initialWorker = false
                }
            });

            // : An updated service worker was installed
            this.wb.addEventListener('waiting', (event) => {
                // : This is the initial service worker. Claim it to start controlling the page
                if (!event.isUpdate) {
                    this.wb.messageSW({ type: 'CLIENTS_CLAIM' })
                }
                // : This is an updated service worker. It is not claimed and is waiting for user confirmation
                if (event.isUpdate) {
                    this.notify("Harvest Haven is ready to be updated", {
                        persist: true,
                        variant: 'info',
                        action: (
                            <>
                                <Button onClick={() => this.updateAndRestart()} size="small" color="inherit">{'Restart Now'}</Button>
                                <Button size="small" color="inherit">{'Not Right Now'}</Button>
                            </>
                        ),
                    });
                    window.addEventListener('beforeunload', (event) => {
                        this.wb.messageSW({ type: 'SKIP_WAITING' });
                    })
                }
            })

            // : The initial worker needs force a page reload after clients.claim() and skipWaiting() were called ealier
            this.wb.addEventListener('activated', async (event) => {
                if (!event.isUpdate) {
                    this.wb.messageSW({ type: 'SET_REFRESHED', payload: true })
                    window.location.reload()
                }
            })

            // : A new service worker in another tab on the same domain activated, refresh this worker to match
            this.wb.addEventListener('externalactivated', async (event) => {
                window.location.reload()
            })

            // : Register the service worker after event listeners have been added.
            this.wb.register()

        }

        // : Set Listeners for Online/Offline Status
        window.addEventListener('online', this.online);
        window.addEventListener('offline', this.offline);

    }

    @action.bound setKey = (key, value) =>
        this[key] = value

    @action.bound offline = () => {
        this.offline = this.notify('Offline mode enabled', {
            persist: true,
            action: (
                <Button onClick={() => this.online()} size="small" color="inherit">{'Dismiss'}</Button>
            ),
        });
        this.closeSnackbar(this.online)
    }

    @action.bound online = () => {
        this.online = this.notify('Your are back online!', {
            variant: 'success',
        });
        this.closeSnackbar(this.offline)
    }

    @action.bound updateAndRestart = () => {
        this.wb.addEventListener('controlling', (event) => {
            window.location.reload()
        });
        // : Send a message telling the service worker to skip waiting && claim clients.
        // : This will trigger the newly added `controlling` event handler above.
        this.wb.messageSW({ type: 'SKIP_WAITING' });
    }

    @action setNotifyFunctions = (functions) => {
        const { enqueueSnackbar, closeSnackbar } = functions
        this.enqueueSnackbar = enqueueSnackbar
        this.closeSnackbar = closeSnackbar
    }

    @action notify = (message, config) =>
        this.enqueueSnackbar(message, {
            ...config,
        })

}