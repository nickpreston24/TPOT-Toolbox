import { observable, computed, action, decorate, configure, toJS } from "mobx"
import { auth, app, firebase } from '../firebase';
import { persist } from "mobx-persist";

export default class ScribeStore {

    constructor(rootStore) {
        this.rootStore = rootStore
        this.notify = this.rootStore.lettersStore.notify
    }

    @persist @observable clean = true
    @persist('list', Session) @observable sessions = []

    @action createSession = file => {
        // const name = !!file ? file : 'Untitled.docx'
        // const name = !!file ? file : 'Untitled(5).docx'
        const name = !!file ? file : 'Untoit Space_ thing 4,!@#$%^&*(this is the way it is) led(18)(19).docx'

        let duplicate = this.sessions.some(session => session.name === name)
        if (duplicate) {
            console.log('bump')
            let version = 0
            let index = 0
            this.sessions.forEach((session, index) => {
                const newVersion = this.getVersionInfo(session.name).version + 1
                if (newVersion > version) {
                    version = newVersion
                    index = index
                }
            })
            console.log(version)
            const newSessionName = `${newSessionInfo.filename}(${version}).docx`
            console.log(newSessionName)
            if (!this.sessions[index].name) {
                const doc = new Session({ name: name })
                this.sessions.push(doc)
            }
        } else {
            if (!this.sessions[0].name) {
                const doc = new Session({ name: name })
                this.sessions.push(doc)
            }
        }
    }

    @action closeSession = () => {

    }

    @action refreshSession = () => {

    }

    @action updateSession = () => {

    }

    getVersionInfo = (name) => {
        const VER_REGX = /(?:\(([\d]{1,3})\)){0,1}(\.docx)/g
        const matches = VER_REGX.exec(name)
        const sample = matches[0]
        const version = new Number(matches[1])
        const index = name.length - sample.length
        const filename = name.slice(0, index)
        return { matches, sample, version, filename, index, name }
    }

}

export class Session {
    @persist @observable name = 'Untitled.docx'

    constructor(config) {
        this.name = config.name
    }

}