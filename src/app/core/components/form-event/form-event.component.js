import { Component } from '@angular/core';

import template from './form-event.template.html';

@Component({
    template,
    selector: 'form-event',
    inputs: ['onSuccess'],
})
export default class FormEventComponent {
    constructor() {

    }

    onSave = event => {
        event.preventDefault();
        console.log('WOOOOHOOOOO');
        this.onSuccess();
    }

    onCancel = () => {
        this.onSuccess();
    }
}
