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
		this.props.store.setRef(element)
		this.editor = element
	}

	render() {
        const { store, session } = this.props
		return (
			<Fragment>
				<Editor
					id={"DraftJS"}
					ref={this.handleRef}
					placeholder="Click to start typing a note..."
					editorState={session.editorState}
					// onFocus={()=>{console.log('focus')}}
					// onBlur={this.handleBlur.bind(this)}
					onChange={editorState => store.onChange(editorState)}
					handleKeyCommand={command => store.handleKeyCommand(command)}
					keyBindingFn={store.myKeyBindingFn}
					setStyleMap={map => store.setStyleMap(map)}
					customStyleMap={store.baseStyleMap} // STYLE MAP TO TYPE
					blockRenderMap={store.blockRenderMap} // BLOCK MAP MAP TO TYPE
					// customStyleFn={customStyleFn} // STYLE & ENTITY CLASS FUNCTION
					blockStyleFn={store.baseBlockStyleFn} // BLOCK & ATOMIC CLASS FUNCTION
					blockRendererFn={store.blockRenderer} // BLOCK ?/& ATOMIC PROPS=>COMP RENDERER
					plugins={plugins}
					spellCheck={false}
					editorRef={store.editor}
					editorFocus={store.focus}
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
