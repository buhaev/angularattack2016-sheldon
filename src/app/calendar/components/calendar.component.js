import {Component} from '@angular/core';
import moment from 'moment';
require('moment-range');

import template from './calendar.template.html';

import {MdButton} from '@angular2-material/button';
import { CalendarService } from '../services/calendar.service';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss+-HH:mm';

@Component({
    selector: 'calendar',
    template: template,
    directives: [MdButton]
})
export class CalendarComponent {
    constructor(calendarService: CalendarService) {
        this.now = moment();
        this.state = {
            month: this.now.month(),
            year: this.now.year()
        };

        this.maxWidths = { // dumb but work
            0: 1,
            1: 7,
            2: 6,
            3: 5,
            4: 4,
            5: 3,
            6: 2
        };

        this.calendarService = calendarService;
        this.days = this.calendarService.getRange();
        this.loadEvents();
    }

    nextMonth() {
        this.state.month += 1;
        this.days = this.calendarService.getRange(this.state.month, this.state.year);
        this.loadEvents();
    }

    prevMonth() {
        this.state.month -= 1;
        this.days = this.calendarService.getRange(this.state.month, this.state.year);
        this.loadEvents();
    }

    loadEvents() {
        this.calendarService.listUpcomingEvents({from: this.days[0].value.format(),
            to: this.days[this.days.length -1 ].value.format()}).then((results) => {
            //console.log(results);
            results.forEach((event) => {
                let start = event.start.dateTime ? moment(event.start.dateTime, DATETIME_FORMAT) :
                    moment(event.start.date, DATE_FORMAT);
                let end = event.end.dateTime ? moment(event.end.dateTime, DATETIME_FORMAT) :
                    moment(event.end.date, DATE_FORMAT);

                let allDay = Boolean(event.start.date || event.end.date);


                event.sheldon = {
                    start: start,
                    end: end,
                    allDay: allDay
                };

                // console.log(start, end, allDay);
                this.days.forEach((day) => {
                    if (day.value.isBetween(start, end, 'day', '[' + (allDay ? ')' : ']'))) {
                        day.events.push(event);
                    }
                });
            });

            this.days.forEach((day) => {
                let slots = [];
                day.events.forEach((event) => {
                    if (event.slot == void 0) {
                        for (var i = 0; i < slots.length; i++) {
                            if (!slots[i]) {
                                event.slot = i;
                                slots[i] = event.id;
                                break;
                            }
                        }

                        if (event.slot == void 0) {
                            slots.push(event.id);
                            event.slot = slots.length - 1;
                        }
                    } else {
                        slots[event.slot] = event.id;
                    }
                });
            });

            console.log(this.days);
        });
    }

    calculateWidth(day, event) {
        var value = 1;

        if (day.value.isSame(event.sheldon.start, 'day')) {
            value = event.sheldon.end.diff(day.value, 'days') + (!event.sheldon.allDay ? 1 : 0);
            value = Math.min(this.maxWidths[day.value.day()], value);
        } else if (day.startOfWeek) {
            value = event.sheldon.end.diff(day.value, 'days') + (!event.sheldon.allDay ? 1 : 0);
            value = Math.min(this.maxWidths[day.value.day()], value);
        }
        return (value * 100) + '%';
    }

    getSummary(day, event) {
        let title = (!event.sheldon.allDay ? event.sheldon.start.format('HH:mm') + ' ' : '') + (event.summary || '(No name)');
        if (day.value.isSame(event.sheldon.start, 'day')) {
            return title;
        } else if (day.startOfWeek) {
            return title;
        }

        return '';
    }

    calculatezIndex(day, event) {
        if (day.value.isSame(event.sheldon.start, 'day')) {
            return event.sheldon.end.diff(day.value, 'days') + (!event.sheldon.allDay ? 1 : 0);
        }
        return 1;
    }

    showEvent(day, event) {
        console.log(event);
    }
}
