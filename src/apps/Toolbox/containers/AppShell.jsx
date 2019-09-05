import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { CurrentApp } from './CurrentApp';
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

const styles = theme => ({
    root: {
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        flexFlow: 'row nowrap',
        overflow: 'hidden',
        display: 'flex',
        flexGrow: 1,
    },
    // content: {
    //     justifyContent: 'flex-start',
    //     flexFlow: 'column nowrap',
    //     boxSizing: 'border-box',
    //     overflow: 'hidden',
    //     display: 'flex',
    //     flexGrow: 1,
    // },
    // currentApp: {
    //     // border: '4px solid red !important',
    //     boxSizing: 'border-box',
    //     overflow: 'hidden',
    //     display: 'flex',
    //     flexGrow: 1,
    // },
    // root: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     flexWrap: 'nowrap',
    //     justifyContent: 'flex-end',
    //     '& > *': {
    //         border: '1px solid red !important'
    //     }
    //     // flexGrow: 1
    //     // alignItems: 'stretch',
    //     // maxHeight: '100vh',
    // },
    // currentApp: {
    //     // flex: 1,
    //     overflow: 'visible',
    // },
    // header: {
    //     border: '4px solid yellow'
    // }
});

class AppShell extends Component {
    // constructor(props) {
    //         super(props);
    // }
    handleDrawerClose = () => {
        this.props.drawerOpen = false
//        console.log("clicked!")
    }

    render() {
        const { classes, ...rest } = this.props;
        // console.log(this.props)
        return (
            <div className={classes.root}>
                {/* <LinkOverlay /> */}
                <Sidebar variant="compact" {...rest} />
                <CurrentApp {...rest} />
                {/* <div id="Content" className={classes.content}> */}
                {/* <Toolbar id="Header" style={{maxHeight: '10px !important', overflow: 'hidden'}} /> */}
                {/* <Header id="Header" style={{ background: '#3e4552 !important' }} />
                    <div id="Current App" className={classes.currentApp}>
                        <Letters />
                        <Notifier />
                    </div>
                </div> */}
                {/* <button onClick={() => setThemeData('primary', {
                    light: '#ff867c',
                    main: '#ef5350',
                    medium: '#d23140',
                    dark: '#b61827',
                    contrastText: '#fff',
                })}>Change Color</button> */}
            </div>
        )
    }
}

export default withStyles(styles)(AppShell);

const LinkOverlay = observer(() =>
    <ul style={{
        position: 'fixed', bottom: 0, zIndex: 9999, right: 20, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0, fontSize: 12,
    }}>
        <li><Link to="/">/</Link></li>
        <li><Link to="/letters">/letters</Link></li>
        <li><Link to="/letters/publish">/letters/publish</Link></li>
        <li><Link to="/letters/load">/library/load</Link></li>
        <li><Link to="/settings">/settings</Link></li>
        <li><Link to="/splash">/splash</Link></li>
    </ul>
)