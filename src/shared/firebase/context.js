import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

// Mixing this with firebase context for now until folder restructure (see kiy'app's /Session and /Firebase)
export const AuthUserContext = React.createContext(null);

export default FirebaseContext;