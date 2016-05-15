import { Component } from '@angular/core';
import template from './popup.template.html';

import FormEventComponent from '../form-event/form-event.component';

@Component({
    template,
    selector: 'popup',
    directives: [FormEventComponent],
    inputs: ['togglePopup'],
})
export default class PopupComponent {
    title = 'New event'
}
