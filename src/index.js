import '../less/_main.less';

// SHIM
import 'es6-shim';
import 'es6-promise';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

// Vendor
import 'validate.js';
import 'localStorage';
import '@angular/core';
import '@angular/common';
import '@angular/platform-browser-dynamic';
import '@angular/router-deprecated';
import '@angular/http';

import 'rxjs/add/operator/map';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { AppComponent } from './app/core/components/app/app.component';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { CALENDAR_PROVIDERS } from './app/calendar';
import { AUTH_PROVIDERS } from './app/auth';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

const gapiPromise = new Promise(function(resolve) {
    window.gapiLoaded = function() {
        resolve(window.gapi);
    };
});

function main() {
    return bootstrap(AppComponent, [
        FORM_PROVIDERS,
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        CALENDAR_PROVIDERS,
        AUTH_PROVIDERS,
        provide(LocationStrategy, { useClass: HashLocationStrategy }),
        provide('ENVIRONMENT', { useValue: ENVIRONMENT }),
        provide('googleApi', { useValue: gapiPromise })
    ]);
}

if (ENVIRONMENT !== 'production') {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
