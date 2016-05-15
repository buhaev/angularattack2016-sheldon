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
    reminders = [{type: 'mm',
        quantity: 15,
        method: 'popup'}];
    emailReminders = [];
    participants = [];

    @Input() event;

    @Output() saved = new EventEmitter();
    @Output() cancel = new EventEmitter();

    constructor (builder:FormBuilder) {

        this.eventForm = builder.group({
            summary: [''],
            place: [''],
            description: [''],
            date: [moment().format(DATE_FORMAT)],
            startTime: ['00:00'],
            endTime: ['03:00'],
            remindTime: ['00'],
            remindType: ['mm']
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

    addReminder ($event) {
        this.reminders.push({
            type: 'mm',
            quantity: 30,
            method: 'popup'
        });
    }

    removeReminder ($index, $event) {
        $event.preventDefault();

        this.reminders.splice($index, 1);
    }

    addEmailReminder ($event) {
        this.emailReminders.push({
            type: 'mm',
            quantity: 30,
            method: 'email'
        });
    }

    removeEmailReminder ($index, $event) {
        $event.preventDefault();

        this.emailReminders.splice($index, 1);
    }
    onSubmit (event) {
        event.reminders = this.reminders.concat(this.emailReminders);
        event.participants = this.participants;

        this.saved.emit(event);
    }

    onCancel = () => {
        this.cancel.emit();
    }
}
