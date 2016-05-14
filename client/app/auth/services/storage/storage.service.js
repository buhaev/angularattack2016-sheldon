import localStorage from 'localStorage';
import { Inject } from '@angular/core';

const STORAGE_KEY = 'auth_token';

export class StorageService {
  constructor() {
    //@Inject('AuthState') authState
    // authState.add((newState) => {
    //   console.log(newState, 'oghh');
    // });
    // this._window = window;
    
    // console.log(window);
    // window.addEventListener('storage', (event) => {
    //   console.log('whoa', event);
    //   if (event.key === STORAGE_KEY) {
    //     console.log(event.newValue);
    //   }
    // }, false);
  }

  getAuthToken() {
    return localStorage.getItem(STORAGE_KEY);
  }

  setAuthToken(token) {
    localStorage.setItem(STORAGE_KEY, token);
  }

  removeAuthToken() {
    localStorage.removeItem(STORAGE_KEY);
  }
}

