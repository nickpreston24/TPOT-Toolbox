import PropTypes from "prop-types";
import React, { Fragment, Component } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import ReactHtmlParser from "react-html-parser";

class Original extends Component {

	render() {
		return (
			<Fragment>
				{ReactHtmlParser(this.props.store.editorStore.originalState)}
			</Fragment>
		);
	}
}

Original.propTypes = {
	editorStore: PropTypes.object.isRequired
};

export default compose(
	inject('store'),
	observer
)(Original);
