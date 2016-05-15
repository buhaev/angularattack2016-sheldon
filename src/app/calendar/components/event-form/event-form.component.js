import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import moment from 'moment';

import template from './event-form.template.html';

import {MdButton} from '@angular2-material/button';

const DATE_FORMAT = 'YYYY-MM-DD';

@Component({
    template,
    selector: 'event-form',
    directives: [MdButton]
})

export default class EventFormComponent {
    @Input() event;

    @Output() saved = new EventEmitter();

    constructor (builder: FormBuilder) {
        this.eventForm = builder.group({
            summary: [''],
            place: [''],
            description: [''],
            date: [moment().format(DATE_FORMAT)],
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
