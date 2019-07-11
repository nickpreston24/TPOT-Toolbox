import { action } from 'mobx';
import { auth } from './firebase';

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

// // Verify a jwt token as being a valid firebase Id Token
// export const verifyToken = (idToken) =>
//     auth.verifyToken(idToken);

// export const onIdTokenChanged = () =>
//     auth.onIdTokenChanged();