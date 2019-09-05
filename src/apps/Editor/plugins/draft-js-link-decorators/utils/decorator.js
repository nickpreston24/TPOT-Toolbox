import { action, computed, decorate, observable} from 'mobx';

class DecoratorStore {

    state = {}
    listeners = {}

    subscribeToItem = (key, callback) => {
        this.listeners[key] = this.listeners[key] || [];
        this.listeners[key].push(callback);
    };

    unsubscribeFromItem = (key, callback) => {
        this.listeners[key] = this.listeners[key].filter((listener) => listener !== callback);
    };

    updateItem = (key, item) => {
        this.state = {
            ...this.state,
            [key]: item,
        };
        if (this.listeners[key]) {
            this.listeners[key].forEach((listener) => listener(this.state[key]));
        }
    };

    getItem = (key) => {
        return this.state[key];
    }

    getProps = null

    editorRef = null
    editorFocus = null
    currentEntityKey = 0
    currentEditorState = null
    insertPoint = null

    setItem = (key, value) => {
        this[key] = value
        // console.log('SET ITEM', key, value)
    }

    get getCurrentEditorState () {
        return this.currentEditorState
    }

}

export default decorate(
    DecoratorStore, {

        state: observable,
        listeners: observable,

        subscribeToItem: action,
        unsubscribeFromItem: action,
        updateItem: action,
        getItem: observable,

        getProps: observable,

        editorFocus: observable,
        editorRef: observable,

        currentEntityKey: observable,
        currentEditorState: observable,
        insertPoint: observable,

        setItem: action,
        getCurrentEditorState: computed,

    })