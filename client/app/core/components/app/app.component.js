import { Component, Inject } from '@angular/core';
import { RouteConfig } from '@angular/router-deprecated';

import template from './app.template.html';
import { MenuComponent } from '../menu/menu.component';
import { LoggedInRouterOutletDirective } from '../../../auth';
import { routes } from './router.config';

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
    LoggedInRouterOutletDirective, MenuComponent, MdButton, MdCard, MdCheckbox, MdIcon, MdInput, MdList,
    MdProgressBar, MdProgressCircle, MdRadioButton, MdSidenav, MdToolbar 
  ],
  template: template
})
@RouteConfig(routes)
export class AppComponent {

  constructor(@Inject('ENVIRONMENT') environment) {
    this.environment = environment;
  }
}
