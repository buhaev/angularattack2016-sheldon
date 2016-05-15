import { Component } from '@angular/core';
import template from './popup.template.html';

@Component({
    template,
    selector: 'popup',
    inputs: ['togglePopup'],
})
export default class PopupComponent {
    title = 'New event'
}
