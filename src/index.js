import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Toolbox from './apps/Toolbox';
import Firebase, { FirebaseContext } from './shared/firebase';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Toolbox />
    </FirebaseContext.Provider>
    , document.getElementById('root'));