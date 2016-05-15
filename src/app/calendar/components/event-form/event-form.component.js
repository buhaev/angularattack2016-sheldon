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
    participants = ['st.geass@gmail.com', 'stgea.ss@gmail.com'];

    @Input() event;

    @Output() saved = new EventEmitter();

    constructor (builder:FormBuilder) {

        this.eventForm = builder.group({
            summary: [''],
            place: [''],
            description: [''],
            date: [moment().format(DATE_FORMAT)],
            startTime: ['00:00'],
            endTime: ['03:00']
        });
    }

    addParticipant ($event) {
        var value = $event.target.value;
        if ($event.keyCode == 13 && value.length) {
            $event.preventDefault();
            this.participants.push(value);
            $event.target.value = '';
        }
    }

    removeParticipant ($index, $event) {
        $event.preventDefault();

        this.participants.splice($index, 1);
    }

    onSubmit (event) {
        event.participants = this.participants;
        this.saved.emit(event);
    }

    onCancel = () => {
        //this.onSuccess();
    }
}
