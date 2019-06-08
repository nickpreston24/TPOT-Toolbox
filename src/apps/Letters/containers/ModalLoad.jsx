import Input from './InputButton';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import GoogleDrive from "../../../shared/media/drive.png";
import HardDrive from "../../../shared/media/hdd.png";
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'

import { convertFile } from "../../../shared/utilities/converter";

const styles = theme => ({
    root: {
        // paddingTop: 64,
        // display: "flex",
        // flexWrap: "wrap"
    },
    paper: {
        maxWidth: 800,
        width: 600
        // height: ,
    },
    icon: {
        display: "block",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        height: 64,
        fontSize: 80,
        paddingTop: 64,
        paddingBottom: 32
    },
    grid: {
        "& button": {
            color: "#555",
            transition: "all 0s linear 0s !important",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)"
        },
        "&:hover": {
            "& button": {
                color: theme.palette.primary.contrastText,
                background: theme.palette.primary.main,
                transition: "all 0s linear 0s !important"
            }
        },
        width: "32.9999%"
    },
    textbox: {
        marginTop: 32,
        marginBottom: 48
    }
});

// @inject('store')
@observer
class ModalLoad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            description: "Select a file from your computer to edit."
        };
    }

    @observable open = true
    @action handleClose = () => {
        console.log('close')
        this.open = false
        const { history, match } = this.props
        if (!!history && history.push) {
            history.push(match.url)
        }
        this.props.store.lettersStore.setCurrentModal(null)
        // this.setState({ open: false });
        // this.props.onUpdate(false);
    };

    handleFile = (e) => {
        const file = e.target.files[0];
        console.log('File blob: ', file)
        // convertFile(file); // Old
        const { store } = this.props
        const { editorStore } = store
        editorStore.convertFileToDraftState(file)
    }

    render() {

        const { classes } = this.props;
        const loaders = [
            {
                name: "From Disk",
                description: "Open a file from your computer's hard drive",
                icon: HardDrive,
                enabled: true,
                handler: (e) => this.handleFile(e)
            },
            {
                name: "Coming Soon",
                description: "Open a file from your linked Google Drive folder",
                icon: GoogleDrive,
                enabled: false,
                handler: (e) => this.handleFile(e)
            },
            // {
            //     name: "Clipboard",
            //     description:
            //         "Opens a window where you can paste in the content of a word document",
            //     icon: ClipBoard,
            //     handler: () => {
            //         this.handleSelection("clipboard");
            //     }
            // }
        ];

        return (
            <Dialog
                id="LoadScreen"
                classes={{ root: classes.root, paper: classes.paper }}
                open={this.props.store.lettersStore.currentModal === 'LoadScreen'}
                onClose={this.handleClose}
                // onBackdropClick={this.handleClose}
                disablePortal
            // BackdropComponent={Backdrop}
            // fullScreen
            // container={this.props.container}
            // disablePortal
            // maxWidth={false}
            >
                {/* <Grid container className={classes.demo} spacing={0} justify="space-evenly" alignItems="center"   > */}
                {loaders.map(option => {

                    const { name, enabled, handler } = option;
                    const { grid } = classes;

                    return (
                        <Grid
                            key={name.toLocaleLowerCase()}
                            item className={grid}
                        >
                            <img
                                src={option.icon}
                                className={classes.icon}
                                alt="cardimg" />
                            <Input {...{name, enabled, handler}} />
                        </Grid>
                    );
                })}
                {/* </Grid> */}
                <DialogContentText
                    align="center"
                    className={classes.textbox}>
                    {this.state.description}
                </DialogContentText>
            </Dialog>
        );
    }
}


const Backdrop = () =>
    <div style={{ height: 300, width: 300, background: 'red', zIndex: -1 }} />

ModalLoad.propTypes = {
    classes: PropTypes.object.isRequired
};

export default inject('store')(withStyles(styles)(ModalLoad));
