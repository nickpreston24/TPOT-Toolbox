import { action, computed, decorate, observable } from 'mobx';

class ToolbarStore {

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

    setStyleProp = (prop, style) => {
        // console.log(prop, style)
        this[prop] = style
    }

    // inlineOrigin = {}
    inlineRef = null
    inlineSize = {}
    // inlineOffset = {}
    inlineVisible = false
    // blockOrigin = {}
    blockRef = null
    blockSize = {}
    // blockOffset = {}
    blockVisible = false

    menuOpen = false
    menuCurrent = null

    editorRoot
    editorRootRect
    currentBlockNode
    selectionRect

    get inlineOrigin() {
        if (!!this.editorRoot && !!this.editorRootRect && !!this.selectionRect)
            return {
                top: (this.editorRoot.offsetTop)
                    + (this.selectionRect.top - this.editorRootRect.top)
                    - 10,
                left: this.editorRoot.offsetLeft
                    + (this.selectionRect.left - this.editorRootRect.left)
                    + (this.selectionRect.width / 2)
            }
        else {
            return null
        }
    }

    get blockOrigin() {
        if (!!this.currentBlockNode && !!this.editorRoot)
            return {
                top: this.currentBlockNode.offsetTop
                    + (this.currentBlockNode.offsetHeight / 2),
                left: this.editorRoot.offsetLeft
                    - 40
            }
        else {
            return null
        }
    }

    get inlineOffset() {
        if (!!this.inlineOrigin) {
            const originLeft = this.inlineOrigin.left
            const editorWidth = this.editorRoot.clientWidth
            const left = (originLeft < 300) ? 100 - originLeft : (originLeft > editorWidth - 40) ? editorWidth - originLeft - 200 - 40 : -200
            return {
                top: -40,
                left: left
            }
        }
        else {
            return null
        }
    }

    get blockOffset() {
        if (!!this.blockOrigin) {
            return {
                top: -15,
                left: -15
            }
        } else {
            return null
        }
    }

    get renderInline() {
        // console.log(this.inlineVisible, this.menuOpen)
        // console.log(this.inlineVisible || this.menuOpen)
        let render = false
        if (!this.inlineVisible && this.menuOpen) {
            render = false
        } else if (this.inlineVisible && !this.menuOpen) {
            render = true
        } else if (this.inlineVisible && this.menuOpen) {
            render = true
        } else {
            render = false
        }
        // console.log(render)
        return render
    }




    get inlineStyle() {
        return { ...this.inlineOrigin, ...this.inlineOffset }
    }

    get blockStyle() {
        return { ...this.blockOrigin, ...this.blockOffset }
    }

}

export default decorate(
    ToolbarStore, {

    state: observable,
    listeners: observable,

    menuOpen: observable,
    menuCurrent: observable,

    inlineRef: observable,
    inlineSize: observable,
    // inlineOffset: observable,
    inlineVisible: observable,

    blockRef: observable,
    blockSize: observable,
    // blockOffset: observable,
    blockVisible: observable,

    renderInline: computed,

    editorRoot: observable,
    editorRootRect: observable,
    currentBlockNode: observable,
    selectionRect: observable,

    inlineOrigin: computed,
    inlineStyle: computed,
    inlineOffset: computed,

    blockOrigin: computed,
    blockOffset: computed,
    blockStyle: computed,

    setStyleProp: action,
    subscribeToItem: action,
    unsubscribeFromItem: action,
    updateItem: action,
    getItem: observable,
})