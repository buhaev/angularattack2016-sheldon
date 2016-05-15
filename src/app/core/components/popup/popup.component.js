import { Component } from '@angular/core';
import template from './popup.template.html';

import EventNewComponent from '../event-new/event-new.component';

@Component({
    template,
    selector: 'popup',
    directives: [EventNewComponent],
    inputs: ['togglePopup'],
})
export default class PopupComponent {
    title = 'New event'
}
