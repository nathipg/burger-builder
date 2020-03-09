import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    };
}

const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
}

export const logout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkIKI2XRYuvRgcWE9ZyHKdUAuF2eQH8kw';

        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkIKI2XRYuvRgcWE9ZyHKdUAuF2eQH8kw';
        }

        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('idToken', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                
                dispatch(authSuccess(response.data.idToken, response.data.userId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
}

export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');

        if(!idToken) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(idToken, userId));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
            } else {
                dispatch(logout());
            }
        }
    };
}