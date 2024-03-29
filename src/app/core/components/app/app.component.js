import {Component, Inject} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import template from './app.template.html';
import {AppLoaderComponent} from '../app-loader/app-loader.component';
import PopupComponent from '../../../calendar/components/popup/popup.component';
import EventFormComponent from '../../../calendar/components/event-form/event-form.component';
import EventNewComponent from '../../../calendar/components/event-new/event-new.component';
import {LoggedInRouterOutletDirective, UserService} from '../../../auth';
import {LoginComponent} from '../../../auth/components/login/login.component';
import {routes} from './router.config';

import {MdButton} from '@angular2-material/button';
import {MdCard} from '@angular2-material/card';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdIcon} from '@angular2-material/icon';
import {MdInput} from '@angular2-material/input';
import {MdList} from '@angular2-material/list';
import {MdProgressBar} from '@angular2-material/progress-bar';
import {MdProgressCircle} from '@angular2-material/progress-circle';
import {MdRadioButton} from '@angular2-material/radio';
import {MdSidenav} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';



@Component({
    selector: 'my-app',
    directives: [
        LoggedInRouterOutletDirective, AppLoaderComponent, MdButton, MdCard, MdCheckbox, MdIcon, MdInput,
        MdList, MdProgressBar, MdProgressCircle, MdRadioButton, MdSidenav, MdToolbar,
        LoginComponent, PopupComponent, EventFormComponent, EventNewComponent
    ],
    template: template
})
@RouteConfig(routes)
export class AppComponent {
    constructor (@Inject('ENVIRONMENT') environment, userService:UserService) {
        this.environment = environment;
        this._userService = userService;
    }

    getLoaded () {
        return this._userService.getLoginChecked();
    }

    getLoggedIn () {
        return this._userService.getLoggedIn();
    }
}
