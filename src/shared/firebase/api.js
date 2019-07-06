import { action } from 'mobx';
import { auth } from './firebase';

// *** Authentication API ***

// Create User
export const createUser = (email, password) => {
    return new Promise(action((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(action((userCredential) => {
                resolve(userCredential)
            }))
            .catch(error => {
                reject(error)
            })
    }))
}

// Request Password Reset
export const requestPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Delete User
export const deleteUser = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const signIn = action((email, password) => {
    return new Promise(action((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(action((user) => {
                console.log('refresh token: ', user.refreshToken)
                resolve(user.user)
            }))
            .catch(error => {
                reject(error)
            })
    }))
})

// Sign out
export const signOut = () =>
    auth.signOut();

// Password Reset
export const resetPassword = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const updatePassword = (password) =>
    auth.currentUser.updatePassword(password);

// *** Merge Auth and DB User API *** //

export const onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
        if (authUser) {
            this.user(authUser.uid)
                .once('value')
                .then(snapshot => {
                    const dbUser = snapshot.val();

                    // empty roles by default
                    if (!dbUser.roles) {
                        dbUser.roles = {};
                    }

                    // merge auth and db user
                    authUser = {
                        uid: authUser.uid,
                        email: authUser.email,
                        ...dbUser,
                    };

                    next(authUser);
                });
        } else {
            fallback();
        }
    });