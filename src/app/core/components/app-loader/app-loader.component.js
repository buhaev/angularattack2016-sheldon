import { Component } from '@angular/core';

import template from './app-loader.template.html';

import {MdProgressCircle} from '@angular2-material/progress-circle';

@Component({
    selector: 'app-loader',
    template: template,
    directives: [MdProgressCircle]
})
export class AppLoaderComponent {

}
