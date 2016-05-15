import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';

import template from './event-form.template.html';

@Component({
    template,
    selector: 'event-form'
})

export default class EventFormComponent {
    @Input() event;

    @Output() saved = new EventEmitter();

    constructor (builder: FormBuilder) {
        this.eventForm = builder.group({
            summary: [''],
            place: [''],
            description: [''],
            date: ['15.05.2016'],
            startTime: ['00:00'],
            endTime: ['03:00']
        });
    }

    onSubmit(event) {
        this.saved.emit(event);
    }

    onCancel = () => {
        //this.onSuccess();
    }
}
