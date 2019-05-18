import PropTypes from "prop-types";
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as hljs from 'react-syntax-highlighter/dist/esm/styles/hljs';

class Code extends Component {

	render() {
		const { editorStore: store } = this.props;

		return (
			<SyntaxHighlighter
				showLineNumbers
				wrapLines
				language='html'
				children={store.editorCode}
				style={hljs.solarizedLight}
				lineProps={{ style: { border: '0px solid yellow' } }}
				codeTagProps={{ style: { border: '0px solid red' } }}
				customStyle={{
					fontSize: 16,
					overflow: 'hidden',
					background: 'transparent',
					textOverflow: 'ellipsis',
				}}
			/>
		);
	}
}

Code.propTypes = {
	editorStore: PropTypes.object.isRequired
};

export default compose(
	inject('editorStore'),
	observer
)(Code);