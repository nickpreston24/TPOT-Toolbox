import Editor from "draft-js-plugins-editor";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { compose } from "recompose";
import { MuiToolbar, plugins } from "./plugins/plugins";

class Draft extends Component {

	componentDidMount = () => {
		this.focus()
	}

	focus() {
		//		console.log('focus called')
		this.editor.blur()
	}

	handleRef = element => {
		this.props.session.editorStore.setRef(element)
		this.editor = element
	}

	render() {
		const { store, session } = this.props
		const { editorState, editorStore } = session
		return (
			<Fragment>
				<Editor
					id={"DraftJS"}
					ref={this.handleRef}
					placeholder="Click to start typing a note..."
					editorState={editorState}
					// onFocus={()=>{console.log('focus')}}
					// onBlur={this.handleBlur.bind(this)}
					onChange={editorState => editorStore.onChange(editorState)}
					handleKeyCommand={command => editorStore.handleKeyCommand(command)}
					keyBindingFn={editorStore.myKeyBindingFn}
					setStyleMap={map => editorStore.setStyleMap(map)}
					customStyleMap={editorStore.baseStyleMap} // STYLE MAP TO TYPE
					blockRenderMap={editorStore.blockRenderMap} // BLOCK MAP MAP TO TYPE
					// customStyleFn={customStyleFn} // STYLE & ENTITY CLASS FUNCTION
					blockStyleFn={editorStore.baseBlockStyleFn} // BLOCK & ATOMIC CLASS FUNCTION
					blockRendererFn={editorStore.blockRenderer} // BLOCK ?/& ATOMIC PROPS=>COMP RENDERER
					plugins={plugins}
					spellCheck={false}
					editorRef={editorStore.editor}
					editorFocus={editorStore.focus}
				/>
				<MuiToolbar />
			</Fragment>
		);
	}
}

Draft.propTypes = {
	store: PropTypes.object.isRequired,
	session: PropTypes.object.isRequired
};

export default compose(
	// inject('store'),
	observer
)(Draft);
