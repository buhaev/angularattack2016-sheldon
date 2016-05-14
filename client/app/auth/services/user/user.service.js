import { Injectable, Inject, ApplicationRef } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const CLIENT_ID = '791129784228-uiaq4sl4km3q3b9buaj99q167sg4g16b.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

@Injectable()
export class UserService {

  _loggedIn = new BehaviorSubject(false);

  constructor(@Inject('gapi') gapi, applicationRef: ApplicationRef) {
    this._gapi = gapi;

    gapi.auth.authorize({
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, (authResult) => {
      this.handleAuthResult(authResult);
      applicationRef.tick();
    });
  }

  handleAuthResult(authResult) {
    var result = Boolean(authResult && !authResult.error);
    console.log('auth result: ', result);
    this._loggedIn.next(result);
    return result;
  }

  login() {
    return new Promise((resolve) => {
      this._gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
      }, (authResult) => {
        resolve(this.handleAuthResult(authResult));
      });
    });
  }

  logout() {
    this._loggedIn.next(false);
  }

  isLoggedIn() {
    return this._loggedIn.getValue();
  }

  getLoggedIn() {
    return this._loggedIn;
  }
}
