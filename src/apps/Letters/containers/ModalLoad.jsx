import Button from "@material-ui/core/Button";
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

// import { convertFile } from "../../../shared/utilities/converter";
// src\shared\utilities\converter.js
///File Import Strategies:
// import { DiskFileLoader } from '../modules/docxLoaders/DiskFileLoader.ts'
// import { GoogleFileLoader } from '../modules/docxLoaders/GoogleFileLoader.ts'
// import { Clipboard } from '../modules/docxLoaders/Clipboard.ts'
// import * as Loaders from '../modules/docxLoaders/Loaders.ts'
// import { Loaders } from '../modules/docxLoaders/Loaders.ts'
// import DiskFileLoader from "../utilities/docxLoaders_js/DiskFileLoader";

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
        this.reader = new FileReader();
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
        if (!this.reader)
            throw new Error("A FileReader must be defined before a file may be loaded!");

        const file = e.target.files[0]
        this.reader.readAsText(file);

        // console.log('handleFile event: ', e)
        console.log('File metadata: ', file)
    }

    render() {
        console.log("RENDERING...");

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
                onBackdropClick={this.handleClose}
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
                        // onClick={enabled ? handler : null}
                        >
                            <img
                                src={option.icon}
                                className={classes.icon}
                                alt="cardimg" />
                            <Button
                                disabled={!enabled}
                                variant="contained"
                                color="inherit" >
                                {name}
                            </Button>
                            <input
                                onChange={handler}
                                type="file"
                                multiple></input>
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
