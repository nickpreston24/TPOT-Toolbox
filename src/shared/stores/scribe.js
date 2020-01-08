import { action, observable, computed } from "mobx";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import EditorStore from './editor'
import { draftContentToHtml } from "../../apps/Editor/utils/transforms";
import { Collection } from 'firestorter';
import { findBadProps } from '../utilities/debug'

export default class ScribeStore {

    @observable sessions = []
    @observable current = 0
    @observable session = null

    // : Firestorter observables
    sessions = new Collection('sessions')

    constructor(root) {
        this.root = root
        this.notify = this.root.lettersStore.notify
        this.session = new Session(this)

        findBadProps(this, 'scribeStore', true)
    }

    @action createSession = async (file) => {
        this.session = new Session(this)
    }

    @action saveSession = () => {
        this.session.saveFile()
    }

    @action clearSession = idx => {
        this.session.clearFile()
        this.session = new Session(this)
    }

    @action publishSession = () => {
    }

    @action loadSession = () => {
    }

    @action previewSession = () => {
    }

}


class Session {

    @observable name = 'Untitled'
    @observable fullname = 'Untitled.docx'
    @observable version = 0
    @observable file = ''
    @observable contributer = ''
    @observable route = ''
    @observable slug = ''
    @observable title = ''
    @observable excerpt = ''
    @observable dateCreated = ''
    @observable lastModified = ''
    @observable sessionStore = null
    @observable editorStore = null
    @observable editorState = createEditorStateWithText('Click to start typing a note...')

    constructor(scribeStore) {
        this.sessionStore = scribeStore
        this.editorStore = new EditorStore(scribeStore.root, this)
    }

    @computed get code() {
        return draftContentToHtml(
            this.editorState,
            this.editorState.getCurrentContent()
        );
    }

    @action convertFile = async (file) => {
        await this.editorStore.convertFileToDraftState(file)
    }

    @action saveFile = () => {
        this.editorStore.saveSession()
    }

    @action clearFile = () => {
        this.editorStore.clearSession()
    }

    @action newFile = () => {
        this.editorStore.newSession()
    }

}