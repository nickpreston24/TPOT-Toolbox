import React from 'react';
import { Provider } from 'mobx-react';
import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider} from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import MobxStore from '../src/shared/stores'

// : Load all stories.jsx in /src, regardless of where they are.
configure(() => {
    const req = require.context('../src', true, /\.stories\.jsx$/);
    req.keys().forEach(filename => req(filename));
}, module);

// : Create  singletons of session required data
const store = new MobxStore()
// console.log('config.js MobxStore: ', store);

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
        accent: {
            pink: '#FF0099'
        },
        background: {
            // default: '#ede5da'
            // default: '#313439'
        }
    },
    typography: {
        fontFamily: "Poppins, 'Helvetica Neue','Helvetica','Arial',sans-serif",
        useNextVariants: true,
    },
});


// : Apply decorators globally to all Storybook assets
// addDecorator(muiTheme())
addDecorator(StoryRouter())
addDecorator(withKnobs)
addDecorator(storyFn =>
    <ThemeProvider {...{ theme }}>
        <Provider {...{ store }} >
            <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="flex-start" style={{
                position: 'absolute', boxSizing: 'border-box', height: '100%', width: '100%', overflow: 'hidden'
            }}>
                {storyFn()}
            </Box>
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