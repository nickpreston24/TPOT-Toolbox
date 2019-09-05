import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { inject, observer} from "mobx-react";
import { compose } from "recompose";


import CodeIcon from '@material-ui/icons/Code'
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined'
import EditIcon from '@material-ui/icons/Edit'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    tabsRoot: {
        // position: "relative",
        // left: "50%",
        // top: 0,
        // transform: "translateX(-50%)",
        // width: '50%',
        // border: '1px solid lime'
        // '& div:nth-first-child(0)': {
        //     background: "yellow !important",
        //     backgroundColor: "yellow !important",
        // }
    },
    button: {
        // margin: 0,
        // padding: 0,
    },
    completed: {
        // display: 'inline-block',
    },

    indicator: {
        top: 39,
        height: 4,
        borderRadius: '6px 6px 0px 0px',
        background: 'rgba(255,255,255,.7)',
    },
    tabRoot: {
        // border: '1px solid green',
        boxSizing: 'border-box',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 'unset',
        minHeight: 44,
        maxHeight: 44,
        // height: "40px !important",
        // minHeight: 48,
        color: 'rgba(255,255,255,.7)',
        // border: '1px solid magenta',
        '&[aria-selected="true"]': {
            // color: theme.palette.primary.contrastText,
        },
        '& span': {
            // marginLeft: "3vw",
            // display: "table",
        },
        '& span span, & span svg': {
            // textAlign: "center",
            // display: "table-cell",
            // verticalAlign: "middle",
        },
        '& span span': {
            // fontSize: 14,
        },
    },
    tabWrapper: {
        // color: 'red',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContents: 'center',
        alignItems: 'center',
        fontSize: 14,
        '& *': {
            display: 'flex'
        }
    },
    tabLabel: {
        margin: 0,
        padding: 0,
        marginLeft: 8,
        width: 'auto',
    },
    // labelIcon: {
    //     fontSize: 14,
    // },
    tabSelected: {
        color: 'rgba(255,255,255,1)'
        // color: "lime",
    }

});

class EditMode extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentTab: 1
        }

        this.tabs = [
            { name: 'Original', icon: <FileIcon /> },
            { name: 'Edited', icon: <EditIcon /> },
            { name: 'Code', icon: <CodeIcon /> },
        ]
    }

    getValueFromTab = (currentTab) => {
//        console.log(currentTab)
    }

    getCodeFromEditor = () => {
//        console.log("GET CODE")
        // Send Data
        let message = {
            event: 'draftjs-editor-get-code',
        }
        window.postMessage(message, "*") // sends to DraftJS WYSIWYG Editor
    }

    handleChange = (e, tab) => {
        // console.log(e, tab)
        // console.log(this.props.lettersStore.setEditMode)
        this.props.lettersStore.setEditMode(tab)
        this.setState({ currentTab: tab }); // update self
        let editMode
        switch (tab) {
            case 0:
                editMode = "original"
                break;
            case 1:
                editMode = "edited"
                break;
            case 2:
                editMode = "code"
                break;
            default:
                editMode = "edited"
                break;
        }
        this.props.onUpdate(editMode) // update parent
    };

    render() {
        const { editorStore: store, classes } = this.props;

        return (
            <Tabs
                classes={{
                    root: classes.tabsRoot,
                    indicator: classes.indicator
                }}
                value={store.editModeKey}
                onChange={(e, tab)=> store.setEditMode(e, tab)}
                fullWidth
                indicatorColor="primary"
                textColor="inherit"
            >
                {this.tabs.map((tab) => {
                    return (
                        <Tab classes={{
                            root: classes.tabRoot,
                            wrapper: classes.tabWrapper,
                            labelContainer: classes.tabLabel,
                            labelIcon: classes.labelIcon,
                            selected: classes.tabSelected
                        }} icon={tab.icon} label={tab.name} key={Math.random(tab.name)} />
                    );
                })}
            </Tabs>
        );
    }
}

EditMode.propTypes = {
    classes: PropTypes.object,
};

// export default withStyles(styles)(EditMode);

export default compose(
	inject('editorStore'),
	withStyles(styles),
	observer
)(EditMode);