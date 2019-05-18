import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { observable, action, decorate, runInAction, computed } from 'mobx'
import { db, auth, firebase } from '../firebase'

class SettingsStore {

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    themeData = {
        palette: {
            common: {
                black: "rgba(102, 97, 91, 1)",
                white: "#fff"
            },
            background: {
                paper: "rgba(255, 255, 255, 1)",
                default: "#f4f3ef"
            },
            primary: { // Satin or Slate
                light: 'rgba(242, 117, 115, 1)',
                main: 'rgba(239, 83, 80, 1)',
                dark: 'rgba(167, 58, 56, 1)',
                contrastText: '#fff',
            },
            secondary: { // Theme Color
                light: 'rgba(75, 166, 255, 1)',
                main: 'rgba(30, 144, 255, 1)',
                dark: 'rgba(21, 100, 178, 1)',
                contrastText: '#fff',
                textLight: '#FFFFFF',
                textMain: '#A7AAB8',
                textDark: '#C2C6D7',
            },
            darkmode: { // Accent (dodgerblue)
                light: '#484b5b',
                main: 'dodgerblue',
                dark: '#272934',
                contrastText: '#fff',
                textLight: '#FFFFFF',
                textMain: '#A7AAB8',
                textDark: '#C2C6D7',
            },
            error: {
                light: "#e57373",
                main: "#f44336",
                dark: "#d32f2f",
                contrastText: "#fff"
            },
            text: {
                primary: "rgb(119, 119, 119)",
                secondary: "rgb(102, 97, 91)",
                disabled: "rgb(221, 221, 221)",
                hint: "rgba(0, 0, 0, 0.38)"
            },
            type: 'light',
            accent: "dodgerblue",
        },
        spacing: {
            unit: 5,
        },
        status: {
            danger: 'orange',
            warning: '#deb15b',
            ready: '#98C379',
        },
        overrides: {
            MuiButton: { // Name of the component ⚛️ / style sheet
                root: { // Name of the rule
                    // borderRadius: '24px !important',
                }
            }
        },
        typography: {
            useNextVariants: true,
        },
    }

    sidebarVariant = 'expanded'

    get theme() {
        return createMuiTheme(this.themeData)
    }

    setKey = (key, value) => {
        this.theme.palette[key] = value
    }

    setThemeData = (key, value) =>
        this.themeData.palette[key] = value

    toggleSidebarVariant = () => {
        if (this.sidebarVariant === 'compact') {
            this.sidebarVariant = 'expanded'
        } else {
            this.sidebarVariant = 'compact'
        }
    }

}

export default decorate(
    SettingsStore, {
        theme: computed,
        themeData: observable,
        setKey: action,
        setThemeData: action,
        sidebarVariant: observable,
        toggleSidebarVariant: action,
    })