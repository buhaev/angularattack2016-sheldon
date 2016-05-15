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
  constructor(calendarService: CalendarService, router: Router) {
    this._calendarService = calendarService;
    this._router = router;
  }

  onSave(event) {
    var dateFormat = 'dd.mm.yyy HH:mm';

    event.start = moment(event.date + ' ' + event.startTime, dateFormat)
        .local().toJSON();
    event.end = moment(event.date + ' ' + event.endTime, dateFormat)
        .local().toJSON();
    console.log('BAZINGA', event);
    this._calendarService.createEvent(event).then(() => {});
  }
}
