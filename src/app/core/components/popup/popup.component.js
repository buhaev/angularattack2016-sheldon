import { Component } from '@angular/core';
import template from './popup.template.html';

import EventFormComponent from '../event-form/event-form.component';

@Component({
    template,
    selector: 'popup',
    directives: [EventFormComponent],
    inputs: ['togglePopup'],
})
export default class PopupComponent {
    title = 'New event'
}
