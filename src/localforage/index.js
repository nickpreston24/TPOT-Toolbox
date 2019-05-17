import localForage from 'localforage';
import videoForage from './videoForage'

export default class Forage {
    constructor() {
        this.root = this
        this.videos = new videoForage(localForage)
    }
}