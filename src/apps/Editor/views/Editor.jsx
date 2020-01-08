import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import { compose } from "recompose";
import Code from "./Code";
import Draft from "./Draft";
import Original from "./Original";

const MUIstyles = theme => ({
    root: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        height: '100%',
        boxShadow: "0px",
        overflow: "hidden"
    },
    editorFrame: {
        marginTop: 32,
        marginBottom: 80,
        boxShadow: '0 2px 2px rgba(204, 197, 185, 0.5)',
        padding: 80,
        paddingLeft: 80,
        paddingRight: 80,
        background: theme.palette.background.paper,
        borderRadius: 6,
        minWidth: 680,
        maxWidth: 850,
        overflowX: "hidden",
        overflowY: "hidden"
    },
    paperFrame: {
        paddingRight: 20,
        paddingLeft: 20,
        overflow: 'scroll',
        maxWidth: 850,
        flex: 1,
    }
});

class Editor extends React.Component {

    render() {
        const { classes, editorStore } = this.props;
        const { focus, editMode } = editorStore

        return (
            <div id="Editor" className={classes.root}>
                <div id="Paper" className={classes.paperFrame}>
                    <div id="Frame" className={classes.editorFrame} onClick={() => { focus() }}>
                        {editMode === "original" && <Original {...{ editorStore }} />}
                        {editMode === "edited" && <Draft {...{ editorStore }} />}
                        {editMode === "code" && <Code {...{ editorStore }} />}
                    </div>
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(MUIstyles),
    observer
)(Editor);
