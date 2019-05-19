import React, { Component, Fragment } from "react";
import { MuiToolbar, plugins } from "./plugins/plugins";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import PropTypes from "prop-types";
import Editor from "draft-js-plugins-editor";

class Draft extends Component {

	componentWillMount() {
		console.log('will mount')
	}

	componentDidMount = () => {
		this.focus()
		// this.props.editorStore.focus()
		// console.log('toggleFocus')
		console.log('mounted')
	}	

	componentWillUnmount() {
		console.log('will UNMOUNT')
		// this.props.editorStore.focus()
		// console.log(this.props.editorStore.editor)
	}

	// handleFocus = () => {
	// 	console.log('focus', this.props.editorStore.editor)
	// 	this.props.editorStore.focus()
	// }

	// handleBlur() {
	// 	console.log('blur')
	// 	this.handleFocus()
	// 	// if (this) {
	// 	// 	if (this.props) {
	// 	// 		if (this.props.editorStore) {
	// 	// 			if (this.props.editorStore.focus) {
	// 	// 				this.props.editorStore.focus()
	// 	// 			}
	// 	// 		}
	// 	// 	}
	// 	// }
	// 	// try {
	// 	// 	this.props.editorStore.focus()
	// 	// } catch (error) {
	// 	// 	console.error(error)
	// 	// }
	// }

	focus() {
		console.log('focus called')
		this.editor.blur()
	}

	handleRef = element => {
		this.props.store.editorStore.setRef(element)
		this.editor = element
	}

	render() {
        // const store = { ...this.props.lettersStore, ...this.props.editorStore }
        // const { lettersStore, editorStore } = this.props.store
        console.log("STORE", this.props.store)
        const { store } = this.props
        const { lettersStore,editorStore } = store

		return (
			<Fragment>
				<Editor
					id={"DraftJS"}
					ref={this.handleRef}
					placeholder="The editor is empty."
					editorState={editorStore.editorState}
					// onFocus={()=>{console.log('focus')}}
					// onBlur={this.handleBlur.bind(this)}
					onChange={editorState => editorStore.onChange(editorState)}
					handleKeyCommand={command => editorStore.handleKeyCommand(command, lettersStore)}
					keyBindingFn={editorStore.myKeyBindingFn}
					setStyleMap={map => editorStore.setStyleMap(map)}
					customStyleMap={lettersStore.baseStyleMap} // STYLE MAP TO TYPE
					blockRenderMap={lettersStore.blockRenderMap} // BLOCK MAP MAP TO TYPE
					// customStyleFn={customStyleFn} // STYLE & ENTITY CLASS FUNCTION
					blockStyleFn={lettersStore.baseBlockStyleFn} // BLOCK & ATOMIC CLASS FUNCTION
					blockRendererFn={lettersStore.blockRenderer} // BLOCK ?/& ATOMIC PROPS=>COMP RENDERER
					plugins={plugins}
					spellCheck={true}
					editorRef={editorStore.editor}
					editorFocus={editorStore.focus}
				/>
				<MuiToolbar />
			</Fragment>
		);
	}
}

Draft.propTypes = {
	editorStore: PropTypes.object.isRequired,
	lettersStore: PropTypes.object.isRequired
};

export default compose(
	inject('store'),
	observer
)(Draft);
