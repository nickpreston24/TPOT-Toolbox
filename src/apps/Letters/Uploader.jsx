import InputButton from './InputButton';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import GoogleDrive from "../../shared/media/drive.png";
import HardDrive from "../../shared/media/hdd.png";
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import firebase from 'firebase';

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
class Uploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            description: "Select a file from your computer to edit."
        };
        this.storageRef = firebase.storage().ref();
    }

    componentDidMount = () => {
        this.props.store.lettersStore.setPublishData('title', '')
        this.props.store.lettersStore.setPublishData('slug', '')
        this.props.store.lettersStore.setPublishData('excerpt', '')

        console.log('storage ref loaded?', !!this.storageRef)
    }

    @observable open = true
    @action handleClose = () => {
        this.open = false
        const { history, match } = this.props
        if (!!history && history.push) {
            history.push(match.url)
        }
        this.props.store.lettersStore.setCurrentModal(null)
    };

    handleFile = (e) => {
        const files = e.target.files;
        const folderName = 'process';

        //Upload to firebase Storage:
        let file = files[0];
        this.upload(folderName, file);
    }

    //TODO: Move this to a context so it can be called by any component
    upload(folderName, file) {
        let translationRef = this.storageRef.child(`${folderName}/${file.name}`);
        translationRef.put(file)
            .then(snapshot => alert(!!snapshot
                ? `Yay! File ${file.name} uploaded successfully!`
                : `Fail! ${file.name} could not be uploaded!`))
            .catch((error) => {
                alert(error.message)
            })
    }

    convertFile(file) {
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
                disablePortal
            >
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
                            <InputButton {...{ name, enabled, handler }} />
                        </Grid>
                    );
                })}
                <DialogContentText
                    align="center"
                    className={classes.textbox}>
                    {this.state.description}
                </DialogContentText>
            </Dialog>
        );
    }
}

Uploader.propTypes = {
    classes: PropTypes.object.isRequired
};

export default inject('store')(withStyles(styles)(Uploader));
