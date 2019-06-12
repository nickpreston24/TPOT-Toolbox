import Firebase from "./firebase";
import FirebaseContext, { withFirebase } from './context';

export default Firebase;
export { FirebaseContext, withFirebase };

// import * as auth from './auth'; //Omitting for now as firebase.js covers most of the code. I can see we want some mobx involvement -MP
// import * as db from './db';
// import * as firebase from './firebase';
// export {
// auth,
// db,
// firebase,
// };