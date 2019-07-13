import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import Code from "./Code";
import Draft from "./Draft";
import Original from "./Original";

const MUIstyles = theme => ({
    root: {
        // border: '1px solid lime',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        background: theme.palette.background.default,
        height: '100%',
        // minHeight: '100vh',
        // height: "calc(100vh - 104px)",
        boxShadow: "0px",
        overflow: "hidden"
    },
    editorFrame: {
        marginTop: 32,
        marginBottom: 80,
        // border: '1px solid blue',
        // boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        boxShadow: '0 2px 2px rgba(204, 197, 185, 0.5)',
        padding: 80,
        paddingLeft: 80,
        paddingRight: 80,
        background: theme.palette.background.paper,
        borderRadius: 6,
        // position: "relative",
        // left: "50%",
        // transform: "translateX(-50%)",
        minWidth: 680,
        // width: "70vw",
        maxWidth: 850,
        overflowX: "hidden",
        overflowY: "hidden"
    },
    paperFrame: {
        // border: '1px solid red',
        paddingRight: 20,
        paddingLeft: 20,
        overflow: 'scroll',
        maxWidth: 850,
        // flexGrow: 1,
        flex: 1,
        // display: 'flex',
    }
});

class Editor extends React.Component {

    render() {
        const { classes, session } = this.props;
        // const { editorStore } = store
        const store = session.editorStore
        const { focus, editMode } = store
        // const { editMode } = store

        return (
            <div id="Editor" className={classes.root}>
                <div id="Paper" className={classes.paperFrame}>
                    {/* <EditMode /> */}
                    <div id="Frame" className={classes.editorFrame} onClick={() => { focus() }}>
                        {editMode === "edited" && <Draft {...{ store, session }} />}
                        {editMode === "original" && <Original {...{ store, session }} />}
                        {editMode === "code" && <Code {...{ store, session }} />}
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
    // inject('store'),
    withStyles(MUIstyles),
    observer
)(Editor);
