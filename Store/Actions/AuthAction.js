import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native';
import actionTypes from './ActionType';

let timer;

export const AutoLogin = () => {
  return { type: actionTypes.AUTO_LOGIN };
};

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: actionTypes.LOGIN, userId: userId, token: token });
  };
};

export const Login = (email, password) => {
  return async dispatch => {
    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjl0mMSy990sVpwPeZJ668BmQvujwFs8w',
        data
      );
      dispatch(
        authenticate(
          response.data.localId,
          response.data.idToken,
          parseInt(response.data.expiresIn) * 1000
        )
      );

      const expirationDate = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn) * 1000
      );

      saveDataToStorage(
        response.data.idToken,
        response.data.localId,
        expirationDate
      );
    } catch (err) {
      let message = 'Something went wrong!';
      if (err.response.data.error.message === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (err.response.data.error.message === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }
  };
};

export const Signup = (email, password) => {
  return async dispatch => {
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjl0mMSy990sVpwPeZJ668BmQvujwFs8w',
        data
      );
      dispatch(
        authenticate(
          response.data.localId,
          response.data.idToken,
          parseInt(response.data.expiresIn) * 1000
        )
      );

      const expirationDate = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn) * 1000
      );

      saveDataToStorage(
        response.data.idToken,
        response.data.localId,
        expirationDate
      );
    } catch (err) {
      let message = 'Something went wrong!';
      if (err.response.data.error.message === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }
  };
};

export const Logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: actionTypes.LOGOUT };
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
