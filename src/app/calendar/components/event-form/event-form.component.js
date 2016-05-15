import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';

import template from './event-form.template.html';

@Component({
    template,
    selector: 'event-form'
})

export default class EventFormComponent {
    participants = ['test', 'test2'];

    @Input() event;

    @Output() saved = new EventEmitter();

    constructor (builder:FormBuilder) {

        this.eventForm = builder.group({
            summary: [''],
            place: [''],
            description: [''],
            date: ['15.05.2016'],
            startTime: ['00:00'],
            endTime: ['03:00']
        });
    }

    addParticipant ($event) {
        $event.preventDefault();

        var value = $event.target.value;
        if ($event.keyCode == 13 && value.length) {
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
