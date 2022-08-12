import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
// если фигня с интернетом, оно спасает

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#00695f',
        },
        secondary: {
            main: '#c6ff00',
        },
    },

});


ReactDOM.render(<ThemeProvider theme={theme}><CssBaseline/><App/></ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
