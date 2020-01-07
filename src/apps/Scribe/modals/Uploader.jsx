import InputButton from '../buttons/InputButton';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import GoogleDrive from "../../../shared/media/drive.png";
import HardDrive from "../../../shared/media/hdd.png";
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { CloudFiles } from '../../../contexts/CloudFiles'

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

/* Holds state and operations for Uploader modal */
class UploaderStore {

    constructor({ lettersStore }) {

        this.cloud = useContext(CloudFiles);
        this.lettersStore = lettersStore
        this.currentModal = lettersStore.currentModal
        this.upload = this.cloud.upload
    }   

    loaders = {
        disk: {
            name: "From Disk",
            description: "Open a file from your computer's hard drive",
            icon: HardDrive,
            enabled: true,
            handler: (event) => {
                const file = this.selectFile(event)
                this.upload(file)
            }
        },
        googleDrive: {
            name: "Coming Soon",
            description: "Open a file from your linked Google Drive folder",
            icon: GoogleDrive,
            enabled: false,
            handler: (event) => { }
        }
        // {
        //     name: "Clipboard",
        //     description:
        //         "Opens a window where you can paste in the content of a word document",
        //     icon: ClipBoard,
        //     handler: () => {
        //         this.handleSelection("clipboard");
        //     }
        // }
    }


    selectFile = (event) => {
        return event.target.files[0];
    }
}

const Uploader = observer((props) => {

    const { classes, store } = props
    const [uploaderState] = useState(new UploaderStore(store));
    const { loaders } = uploaderState
    const { currentModal, setCurrentModal } = uploaderState.lettersStore

    return (
        <Dialog
            id="LoadScreen"
            classes={{ root: classes.root, paper: classes.paper }}
            open={currentModal === 'LoadScreen'}
            onClose={() => {
                //TODO: refactor this, it's ugly.
                const { history, match } = props
                if (!!history && history.push)
                    history.push(match.url)
                setCurrentModal(null)
            }}
            disablePortal
        >
            {Object.values(loaders).map(option => {
                const { name, enabled, handler } = option;
                const { grid } = classes;

                return (
                    <div>
                        <Grid
                            key={name.toLocaleLowerCase()}
                            item className={grid}
                        >
                            <img
                                src={option.icon}
                                className={classes.icon}
                                alt="cardimg" />
                            <InputButton {...{ name, enabled, handler }} />
                        </Grid>
                        <DialogContentText
                            align="center"
                            className={classes.textbox}>
                            {option.description}
                        </DialogContentText>
                    </div>
                )
            })}
        </Dialog>
    )
})

Uploader.propTypes = {
    classes: PropTypes.object.isRequired
};

export default inject('store')(withStyles(styles)(Uploader));