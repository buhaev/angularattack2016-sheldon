import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class RequestService {

  constructor() {
    // this._storage = storage;
  }

  getAuthHeaders() {
    let headers = this.getJsonHeaders();
    // let authToken = this._storage.getAuthToken();

    // headers.append('Authorization', `Bearer ${authToken}`);
    return headers;
  }

  getJsonHeaders() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
