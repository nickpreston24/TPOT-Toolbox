import { faEnvelopeOpen, faHdd, faPaperPlane, faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faGlasses, faSlidersH, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
// import { ContentSaveOutline, FolderOpen } from 'mdi-material-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import PropTypes from "prop-types";
import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { SidebarBadge } from "./SidebarBadge";


const styles = theme => ({
    root: {
        // background: '#28303d',
        background: theme.palette.background.paper,
        minWidth: 120,
        maxWidth: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transition: 'all 0.35s ease-in-out',
        boxSizing: 'border-box',
        borderRight: `1px solid ${theme.palette.text.disabled}`,
        overflow: 'hidden',
        // border: '1px solid lime'
    },
    compact: {
        minWidth: 70,
        maxWidth: 70,
    },
    expanded: {
        minWidth: 260,
        maxWidth: 260,
    },
    logo: {
        margin: theme.spacing.unit * 2.5,
        minHeight: 30,
        minWidth: 30,
        cursor: 'pointer'
    },
    navButton: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 400,
        padding: '15px 30px',
        // color: theme.palette.text.primary,
        // '&:hover': { color: theme.palette.primary.main, '&:hover *': { color: theme.palette.primary.main }},
        '&:hover.amber': { color: '#f9843f', '&:hover .amber': { color: '#f9843f' } },
        '&:hover.rose': { color: '#f52266', '&:hover .rose': { color: '#f52266' } },
        '&:hover.gold': { color: '#ffbc00', '&:hover .gold': { color: '#ffbc00' } },
        '&:hover.teal': { color: '#20cdde', '&:hover .teal': { color: '#20cdde' } },
        '&:hover.blue': { color: '#1e90ff', '&:hover .blue': { color: '#1e90ff' } },
        '&:hover.plum': { color: '#be33f7', '&:hover .plum': { color: '#be33f7' } },
        '&:hover.mint': { color: '#19e180', '&:hover .mint': { color: '#19e180' } },
    },
    nabButtonLabel: {
        '& svg': {
            color: theme.palette.text.primary,
            minHeight: 28,
            minWidth: 28,
            marginRight: 22,
        },
    }
})

const appsSidebarButtonsConfig = [
    {
        primaryText: 'Save',
        secondaryText: 'Save File to Disk',
        store: 'editorStore',
        action: 'saveSession',
        icon: faSave,
        color: 'teal'
    },
    {
        primaryText: 'Load',
        secondaryText: 'Open DocX from Source',
        store: 'lettersStore',
        action: 'setCurrentModal',
        payload: 'LoadScreen',
        icon: faHdd,
        color: 'rose'
    },
    {
        primaryText: 'Drafts',
        secondaryText: 'Load Autosaved File',
        icon: faEnvelopeOpen,
        color: 'gold'
    },
    {
        primaryText: 'Publish',
        secondaryText: 'Publish Page to TPOT',
        store: 'lettersStore',
        action: 'setCurrentModal',
        payload: 'PublishScreen',
        icon: faPaperPlane,
        color: 'mint'
    },
    {
        primaryText: 'Preview',
        secondaryText: 'Previw Page in Browser',
        icon: faGlasses,
        color: 'plum'
    },
    {
        primaryText: 'Clear',
        secondaryText: 'Create a Fresh Post',
        store: 'editorStore',
        action: 'clearSession',
        icon: faTrashAlt,
        color: 'amber'
    },
    {
        primaryText: 'Settings',
        secondaryText: 'Adjust Toolbox Preferences',
        icon: faSlidersH,
        color: 'none'
    },
]

const Sidebar = observer((props) => {
    const { classes } = props
    const { sidebarVariant } = props.store.settingsStore
    return (
        <div id="Sidebar" className={classNames(classes.root, sidebarVariant && classes[sidebarVariant])}>
            {/* <OSTitleBar /> */}
            {/* <img onClick={() => toggleSidebarVariant()} className={classes.logo} src={sidebarVariant === 'compact' ? ToolboxIcon : ToolboxIconWide} alt="ToolboxLogo" /> */}
            <SidebarBadge />
            <AppButtons {...{ config: appsSidebarButtonsConfig, classes, variant: sidebarVariant }} />
        </div>
    )
})

const AppButtons = observer(({ config, classes, variant }) => (
    <Fragment>
        {config.map((data, index) => (
            <NavButton key={index} {...{ classes, data, variant }}></NavButton>
        ))}
    </Fragment>
))

export const NavButton = compose(
    inject('store'),
    withStyles(styles),
    observer
)(({ store, data, classes, variant }) => {

    const handleClick = () => {

        const { store: storeName, action, payload } = data;
        const canRun = [storeName, action, payload].every(val => !!val);
        const hasPayload = !!payload;

        if (!canRun) {
            // throw new Error("Cannot run action as one or more variables is unassigned"); // Optional
            return;
        }
        else console.log(`running ${storeName} action '${action}' with ${payload} payload`);

        if (hasPayload) {
            store[storeName][action](payload)
        } else {
            store[storeName][action]()
        }
    }

    return (
        // <div id={`NavButton-${data.primaryText}`} className={classNames(classes.navButton, data.color)}>
        <Button
            id={`NavButton-${data.primaryText}`}
            className={classNames(classes.navButton, data.color)}
            classes={{ label: classes.nabButtonLabel }}
            onClick={() => handleClick()}
        >
            {/* {data.icon && <data.icon />} */}
            <FontAwesomeIcon icon={data.icon} size="lg" className={data.color} />
            {variant === 'expanded' && <span>{data.primaryText}{classes.navButton.color}</span>}
        </Button>
        // </div>
    )
})

// export const NavButton = observer(({ data, classes, variant }) => (

// ))

Sidebar.propTypes = {
    variant: PropTypes.string.isRequired,
};

export default compose(
    withStyles(styles),
    inject('store'),
    observer
)(Sidebar)