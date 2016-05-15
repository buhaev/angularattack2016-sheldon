import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';

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
    console.log('BAZINGA', event);
    this._calendarService.createEvent(event).then(() => {});
  }
}
