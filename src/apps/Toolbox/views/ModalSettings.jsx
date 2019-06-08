import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AccountIcon from '@material-ui/icons/AccountBoxOutlined';
import ThemeIcon from 'mdi-material-ui/InvertColors';
import PreferencesIcon from 'mdi-material-ui/Tune';
import PropTypes from 'prop-types';
import React from 'react';
import SettingsAccount from './SettingsAccount';
import SettingsPreferences from './SettingsPreferences';
import SettingsTheme from './SettingsTheme';


const styles = theme => ({
    root: {
        paddingTop: 64,
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    paper: {
        width: 325,
        height: 500,
    },
    tabsRoot: {
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    },
    tabsIndicator: {
        background: theme.palette.primary.main
    },
    tabRoot: {
        color: "#555",
        textTransform: 'initial',
        minWidth: "33%",
        '&:hover': {
            color: theme.palette.primary.main,
            opacity: 1,
        },
        '&$tabSelected': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
            background: '#fff',
        },
        '&:focus': {
            color: theme.palette.primary.main,
        },
    },
    tabSelected: {},
});

class ModalSettings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 1,
        }
    }

    handleClose = () => {
        this.props.onUpdate(false);
    };

    handleChange = (event, value) => {
        this.setState({ value: value });
    };

    render() {
        const { classes } = this.props;

        const tabs = [
            {
                name: "Account",
                icon: <AccountIcon />,
            },
            {
                name: "Prefrences",
                icon: <PreferencesIcon />,
            },
            {
                name: "Theme",
                icon: <ThemeIcon />,
            }
        ]

        return (
            <Dialog
                classes={{
                    root: classes.root,
                    paper: classes.paper,
                }}
                open={this.props.open}
                onClose={this.handleClose}
            >
                <div>
                    <Tabs value={this.state.value} onChange={this.handleChange} fullWidth classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}>
                        {tabs.map((tab) => {
                            return (
                                <Tab key={tab.name} icon={tab.icon} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
                            );
                        })}
                    </Tabs>
                </div>
                {this.state.value === 0 && <SettingsAccount />}
                {this.state.value === 1 && <SettingsPreferences />}
                {this.state.value === 2 && <SettingsTheme />}
            </Dialog>
        );
    }
}

ModalSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalSettings)