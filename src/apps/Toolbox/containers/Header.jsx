import { faBell, faCaretSquareDown, faFlag, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RoutedBreadCrumbs } from './Breadcrumbs';


// const electron = require('electron');
// const ipc = electron.ipcRenderer
// const shell = electron.shell

const styles = theme => ({
    root: {
        // linear-gradient(135deg, #2089fe 30%, #a42ae2 100%)
        // background: `linear-gradient(135deg, ${'#2089fe'} 30%, ${'#7453b9'} 100%)`,
        // background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.main} 100%)`,
        WebkitAppRegion: 'no-drag',
        display: 'flex',
        alignItems: 'stretch',
        // minHeight: 96,
        // maxHeight: 96,
        minHeight: 75,
        maxHeight: 75,
        overflow: 'hidden',
        boxSizing: 'border-box',
        borderBottom: `1px solid ${theme.palette.text.disabled}`,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    headerbutton: {
        fontWeight: `400 !important`,
        color: 'red',
        '&*': {
            borderRadius: 24,
        }
    },
    extendedIcon: {
        // fontSize: 16,
        marginRight: theme.spacing.unit * 3,
    },
    headerRow: {
        // border: `1px solid ${theme.palette.primary.dark}`,
        boxSizing: 'border-box',
        height: 48,
        '&:nth-child(1)': { height: 48 },
        '&:nth-child(2)': { height: 56 },
        overflow: 'visible',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
    },
    rowGroup: {
        flexGrow: 1,
        flexShrink: 1,
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        padding: 8,
        '& > *': {
            display: 'inline-flex',
            color: 'rgba(255,255,255,.7)',
            margin: 4,
        }
    },
    // rowWrapper: {
    //     border: `1px solid ${theme.palette.primary.dark}`,
    //     boxSizing: 'border-box',
    //     height: 40,
    //     '&:nth-child(2)': {
    //         height: 55
    //     },
    //     overflow: 'visible',
    //     display: 'flex',
    //     flexFlow: 'row nowrap',
    //     justifyContent: 'flexStart',
    // },
    settings: {
        position: "absolute",
        bottom: 8,
    },
    avatar: {
        width: 32,
        height: 32,
    },
    primaryText: {
        color: theme.palette.secondary.textLight,
    },
    secondaryText: {
        color: theme.palette.secondary.textDark,
    },
    active: {
        background: theme.palette.primary.darkS
    },
    toolbar: {
        background: theme.palette.secondary.light,
        maxHeight: 48,
        paddingRight: 12,
        WebkitAppRegion: 'no-drag'
    },
    logBar: {
        color: "#a0da7c",
        // width: "100%",
        fontStyle: "italic",
        WebkitAppRegion: 'no-drag'
    },
    toolSet: {
        // minWidth: 600,
        // float: "right",
        "&*": {
            display: "inline-block",
        }
    },
    rightIcon: {
        marginLeft: 10
    },
    badgeVisible: {
        position: "absolute",
        right: 0,
        top: 0,
        height: 18,
        width: 18,
        opacity: 100,
        background: theme.palette.accent
    },
    badgeInvisible: {
        height: 0,
        width: 0,
        opacity: 0,
        transition: "all 1s ease-in-out 0s",
    },
    downloadSvg: {
        fontSize: 14,
        color: theme.palette.primary.contrastText
    }
});

@inject('store')
class Header extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         loadModalOpen: false,
    //         settingsModalOpen: false,
    //         secondary: true,
    //     }
    // }
    state = {
        loadModalOpen: false,
        settingsModalOpen: false,
        autoUpdateModal: false,
        secondary: true,

        updateAvailable: false,
        updateVersion: "uknown version",
        updateDownloadProgress: {}
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
        // let setUpdateAvailable = this.setUpdateAvailable
        // let setUpdateDownloadProgress = this.setUpdateDownloadProgress
        // ipc.on('auto-update', function (e, msg) {
        //     console.log(msg)
        //     if (msg.event === "update-available") {
        //         console.log(msg)
        //         setUpdateAvailable(msg)
        //     }
        //     if (msg.event === "update-download-progress" && msg.data) {
        //         setUpdateDownloadProgress(msg)
        //     }
        // })
    }

    getHelp = () => {
        // shell.openExternal('https://trello.com/c/NoyEqoFY/45-bug-reports-and-testing')
    }

    setUpdateAvailable = (msg) => {
        this.setState({
            updateAvailable: true,
            updateVersion: msg.data && msg.data.version ? msg.data.version : "unknown version"
        })
    }

    setUpdateDownloadProgress = (msg) => {
        this.setState({ updateDownloadProgress: msg.data })
    }

    openUpdateModal = () => {
        this.setState({
            autoUpdateModal: true,
        })
    }

    closeUpdateModal = () => {
        this.setState({ autoUpdateModal: false })
    }

    handleUpdateConfirmDownloadAndRestart = () => {
        // ipc.send('update-confirm-download-and-restart')
    }

    handleUpdateConfirmDownload = () => {
        // ipc.send('update-confirm-download')
    }

    handleUpdateConfirmRestart = () => {
        // ipc.send('update-confirm-restart')
    }

    render() {
        const { classes, store } = this.props;
        const { sessionStore } = store
        console.log(sessionStore)
        return (
            <div id="Header" className={classes.root}>
                <Grid container direction="row" justify="flex-start" alignItems="center" style={{ flexWrap: 'nowrap' }} >
                    <Grid item container direction="row" justify="flex-start" alignItems="center" style={{ flexShrink: 2 }} >
                        {/* <RoutedBreadCrumbs /> */}
                    </Grid>
                    <Grid item container direction="row" justify="flex-end" alignItems="center" style={{ flexWrap: 'nowrap', flexGrow: 2 }} >
                        <HeaderButton {...{ classes, icon: faUser, sessionStore, label: 'Sign In' }} />
                        {/* <HeaderButton {...{ classes, icon: faBell, label: "Notifications" }} /> */}
                        <HeaderButton {...{ classes, icon: faFlag, sessionStore, label: 'Help' }} />
                        <HeaderButton {...{ classes, icon: faCaretSquareDown, sessionStore }} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const HeaderButton = observer(({ classes, children, icon, label, sessionStore }) => {
    return (
        <Button classes={{root: classes.headerButton}} onClick={() => {
            // sessionStore.signIn()
            }} >
            <FontAwesomeIcon className={classes.extendedIcon} icon={icon} size="lg" />
            {label && label}
        </Button>
    )
})

// const HeaderRow = observer(({ classes, children }) => {
//     return (
//         <div className={classes.headerRow}>
//             {children}
//         </div>
//     )
// })

// const RowGroup = observer(({ classes, children, align }) => {
//     return (
//         <div
//             className={classes.rowGroup}
//             style={{ justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center' }}
//         >
//             {children && [children].map((child, index) => (
//                 [child]
//                 // <Grid item key={index} >{child}</Grid>
//             ))}
//         </div>
//     )
// })

// const AppSwitcher = observer(({ classes, children }) => {
//     return (
//         <RowGroup align='left' classes={classes}>
//             {children}
//         </RowGroup>
//     )
// })

// const ProfileTools = observer(({ classes, children }) => {
//     return (
//         <RowGroup align='right' classes={classes}>
//             {children}
//         </RowGroup>
//     )
// })

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);