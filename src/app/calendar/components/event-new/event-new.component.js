import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import moment from 'moment';

import template from './event-new.template.html';
import { CalendarService } from '../../services/calendar.service';
import EventFormComponent from '../event-form/event-form.component';

@Component({
    selector: 'event-new',
    template: template,
    directives: [EventFormComponent]
})
export default class EventNewComponent {
    constructor (calendarService:CalendarService, router:Router) {
        this._calendarService = calendarService;
        this._router = router;
    }

    onSave (event) {
        var dateFormat = 'dd/mm/yyy HH:mm';

        this._calendarService.createEvent({
            summary: event.summary,
            location: event.place,
            description: event.description,
            start: {
                dateTime: moment(event.date + ' ' + event.startTime, dateFormat)
                    .local().toJSON()
            },
            end: {
                dateTime: moment(event.date + ' ' + event.endTime, dateFormat)
                    .local().toJSON()
            },
            attendees: event.participants.map(value => ({ email: value })),
            reminders: {
                'useDefault': false,
                'overrides': event.reminders.map((reminder) => {
                    let mult = this._calendarService.multipliers[reminder.type];
                    return {
                        method: 'email',
                        minutes: reminder.quantity * mult
                    }
                })
            }
        }).then(() => {
        });
    }
}
