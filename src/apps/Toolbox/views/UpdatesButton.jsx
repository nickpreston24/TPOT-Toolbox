// React
// Material UI
import Badge from '@material-ui/core/Badge';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ErrorIcon from 'mdi-material-ui/Alert';
import FinishedIcon from 'mdi-material-ui/Check';
import UpdateIcon from 'mdi-material-ui/CloudDownload';
import DownloadIcon from 'mdi-material-ui/Download';
import SyncIcon from 'mdi-material-ui/Sync';
import React from 'react';



// Electron
const electron = window.require('electron')
const remote = electron.remote;
const ipc = electron.ipcRenderer
const app = remote.app
const isDev = remote.require("electron-is-dev");

// Development Information
console.log(`%cDevelopment Mode : ${isDev ? 'PRODUCTION' : 'RELEASE'}`, "color: #56C3E8;")
console.log(`%cApp Version : ${app.getVersion()}`, "color: #56C3E8;")

// Material UI Styles
const styles = theme => ({
    root: {
        // Keep in mind this is respective to parent
        // display: "inline-block",
        display: 'flex'
        // float: "right",
    },
    rootWide: {

    },
    button: {
        color: 'rgba(255,255,255,.7)'
    },
    badgeIcon: {
        marginLeft: 10
    },
    badgeSpan: {
        right: 0,
        top: 0,
        height: 18,
        width: 18,
        opacity: 100,
    },
    badgeSvg: {
        fontSize: 14,
        color: "#fff",
        textShadow: "2px 2px #FF0000"
    },
    progressRoot: {
        width: 100,
        height: 12,
        borderRadius: 20,
        background: theme.palette.primary.dark,
    },
    progressBar: {
        margin: 3,
        maxWidth: 94,
        borderRadius: 20,
        background: theme.palette.primary.main,
    },
    green: { background: theme.status.ready },
    yellow: { background: theme.status.warning },
    accent: { background: theme.palette.accent },
    invisible: { background: "transparent" },
});


class UpdatesButton extends React.Component {
    state = {
        updateError: false,
        updateAvailable: false,
        updateDownloaded: false,
        updateDownloading: false,
        updateDownloadProgress: {},
        updateVersion: "uknown version",
        updateDownloadVersion: "uknown version",
        updateStatus: "DEFAULT",
        autoUpdateModal: false
    }

    openLoadModal = () => {
        this.setState({ loadModalOpen: true })
    }

    updateLoadModal = (bool) => {
        this.setState({ loadModalOpen: bool })
    }

    openSettingsModal = () => {
        this.setState({ settingsModalOpen: true })
    }

    updateSettingsModal = (bool) => {
        this.setState({ settingsModalOpen: bool })
    }

    componentDidMount() {
        let setUpdateError = this.setUpdateError
        let setUpdateAvailable = this.setUpdateAvailable
        let setUpdateDownloadProgress = this.setUpdateDownloadProgress
        let setUpdateDownloadFinished = this.setUpdateDownloadFinished
        ipc.on('auto-update', function (e, msg) {
            // console.log(msg)
            if (msg.event === "update-available") {
                setUpdateAvailable(msg)
            }
            if (msg.event === "update-download-progress") {
                setUpdateDownloadProgress(msg)
            }
            if (msg.event === "update-downloaded") {
                setUpdateDownloadFinished(msg)
            }
            if (msg.event === "update-error") {
                setUpdateError(msg)
            }
        })
    }

    setUpdateError = (err) => {
        this.setState({
            updateError: true,
            updateStatus: "ERROR"
        })
    }

    setUpdateAvailable = (msg) => {
        if (this.state.updateDownloaded === false && this.state.updateDownloading === false) {
            this.setState({
                updateError: false,
                updateAvailable: true,
                updateVersion: msg.data.version | "unknown version",
                updateStatus: "AVAILABLE"
            })
        }
    }

    setUpdateDownloadProgress = (msg) => {
        this.setState({
            updateError: false,
            updateDownloading: true,
            updateDownloadProgress: msg.data,
            updateStatus: "DOWNLOADING"
        })
    }

    setUpdateDownloadFinished = (info) => {
        this.setState({
            updateError: false,
            updateDownloaded: true,
            updateDownloading: false,
            updateDownloadVersion: info.version | "unknown version",
            updateStatus: "DOWNLOADED"
        })
    }

    setCurrentStatus = async () => {
        this.setState({
            updateStatus: this.state.updateError ?
                "ERROR"
                : this.state.updateDownloaded ?
                    "DOWNLOADED"
                    : this.state.updateDownloading ?
                        "DOWNLOADING"
                        : this.state.updateAvailable ?
                            "AVAILABLE"
                            : "DEFAULT"
        })
    }

    handleUpdateConfirmDownloadAndRestart = () => {
        ipc.send('update-confirm-download-and-restart')
    }

    handleUpdateConfirmDownload = () => {
        ipc.send('update-confirm-download')
    }

    handleUpdateConfirmRestart = () => {
        ipc.send('update-confirm-restart')
    }

    openUpdateModal = () => {
        this.setState({
            autoUpdateModal: true,
        })
    }

    closeUpdateModal = () => {
        this.setState({ autoUpdateModal: false })
    }

    render() {
        const { classes } = this.props;
        const { updateStatus } = this.state
        const badges = [
            {
                status: "ERROR",
                class: "yellow",
                icon: <ErrorIcon className={classes.badgeSvg} />,
            },
            {
                status: "AVAILABLE",
                class: "accent",
                icon: <DownloadIcon className={classes.badgeSvg} />,
            },
            {
                status: "DOWNLOADING",
                class: "accent",
                icon: <SyncIcon className={classes.badgeSvg} />,
            },
            {
                status: "DOWNLOADED",
                class: "green",
                icon: <FinishedIcon className={classes.badgeSvg} />,
            },
            {
                status: "DEFAULT",
                class: "invisible",
                icon: <div/>,
            },
        ]
        const badge = badges.find(badge => badge.status === updateStatus)
        // const progressString = this.state.updateDownloadProgress != null ? `Downloading Update: ${this.state.updateDownloadProgress.percent}% (${this.state.updateDownloadProgress.transferred}/${this.state.updateDownloadProgress.total}) - Download speed: ${this.state.updateDownloadProgress.bytesPerSecond}` : `Unknown Progress`

        return (
            <div id="Updates Button" className={classNames(classes.root, this.state.updateDownloading ? classes.rootWide : null )}>
                {/* <LinearProgress color="primary" variant="determinate" value={this.state.updateDownloadProgress.percent} style={{ display: "inline-block" }} /> */}
                <Badge badgeContent={badge.icon} onClick={this.openUpdateModal} classes={{ root: classes.badgeRoot, badge: classNames(classes.badgeSpan, classes[badge.class]) }} >
                    <Button className={classNames(classes.button)}>
                        {!this.state.updateDownloading ? 
                            ""
                            : <LinearProgress variant="determinate" value={this.state.updateDownloadProgress.percent} classes={{ root: classes.progressRoot, bar: classes.progressBar, bar1Indeterminate: classes.progressBar1Indeterminate, bar2Indeterminate: classes.progressBar2Indeterminate }} />
                        }
                        <UpdateIcon className={classes.badgeIcon} />
                    </Button>
                </Badge>

                <Dialog
                    open={this.state.autoUpdateModal}
                    onClose={this.closeUpdateModal}
                >
                    <DialogTitle id="responsive-dialog-title">{"TPOT Cloud Updates"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{`There is a new update available for download: Toolbox ${!isDev ? this.state.updateVersion : "[dev]"}`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleUpdateConfirmDownloadAndRestart} id='Update All' color="primary">{`Update & Restart`}</Button>
                        <Button onClick={this.handleUpdateConfirmDownload} id='Update Download' color="primary" autoFocus>{`Download`}</Button>
                        <Button onClick={this.handleUpdateConfirmRestart} id='Update Restart' color="primary" autoFocus>{`Restart`}</Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

export default withStyles(styles)(UpdatesButton);