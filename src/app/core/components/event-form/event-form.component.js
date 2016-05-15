import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';

import template from './event-form.template.html';

@Component({
    template,
    selector: 'event-form',
    inputs: ['onSuccess'],
})

export default class EventFormComponent {
    @Input() event;

    @Output() saved = new EventEmitter();

    constructor (builder: FormBuilder) {
        this.eventForm = builder.group({
            summary: ['']
        });
    }

    ngOnChanges (change) {
        console.log(123);
    }

    onSave (event) {
        console.log('onSave', event);
        //event.preventDefault();

        //this.onSuccess();
    }

    onSubmit(event) {
        console.log('BAZINGA', event);
        //this.saved.emit(event);
    }

    onCancel = () => {
        //this.onSuccess();
    }
}
