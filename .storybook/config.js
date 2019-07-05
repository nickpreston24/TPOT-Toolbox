import React from 'react';
import { configure, storiesOf, addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider, install } from "@material-ui/styles";
import { Provider } from 'mobx-react';
import MobxStore from '../src/shared/stores'
import { withKnobs } from '@storybook/addon-knobs';
// import '@storybook/addon-console';
// import StoryRouter from 'storybook-react-router';
import { createMuiTheme } from "@material-ui/core/styles";
// import { muiTheme } from 'storybook-addon-material-ui';
// import Forage from '../src/shared/localforage'


// : Load all stories.jsx in /src, reguardless of where they are.
configure(() => {
    const req = require.context('../src', true, /\.stories\.jsx$/);
    req.keys().forEach(filename => req(filename));
}, module);


// : Create  singletons of session required data
const store = new MobxStore()

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#cddc39',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        accents: {
            pink: '#FF0099'
        },
        background: {
            default: '#ede5da'
            // default: '#313439'
        }
    },
    typography: {
        useNextVariants: true,
    },
});


// : Apply decorators globally to all Storybook assets
// addDecorator(muiTheme())
// addDecorator(StoryRouter())
addDecorator(withKnobs)
addDecorator(storyFn =>
    <ThemeProvider {...{ theme }}>
        <Provider {...{ store }} >
            {storyFn()}
        </Provider>
    </ThemeProvider>
);

// : Configure Parameters for various plugins
// addParameters({
//   viewport: {
//     defaultViewport: 'responsive',
//   },
//   backgrounds: [
//     { name: 'default', value: '#FFFFFF' },
//     { name: 'paper', value: '#f4f3ef', default: true },
//   ],
// });