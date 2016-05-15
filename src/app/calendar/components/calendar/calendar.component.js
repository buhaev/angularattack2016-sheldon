import {Component} from '@angular/core';
import moment from 'moment';
require('moment-range');

import template from './calendar.template.html';

import {MdButton} from '@angular2-material/button';
import {MdList} from '@angular2-material/list';
import { CalendarService } from '../../services/calendar.service';
import { UserService } from '../../../auth';
import PopupComponent from '../popup/popup.component';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/components/dropdown';
import { find } from 'lodash';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZZ';

@Component({
    selector: 'calendar',
    template: template,
    directives: [MdButton, PopupComponent, MdList, DROPDOWN_DIRECTIVES],
    inputs: ['toggleNewEvent']
})
export class CalendarComponent {
    constructor(calendarService: CalendarService, userService: UserService) {
        this.userService = userService;
        this.state = moment();

        this.maxWidths = { // dumb but work
            0: 1,
            1: 7,
            2: 6,
            3: 5,
            4: 4,
            5: 3,
            6: 2
        };

        this.newEventPopupVisible = false;

        this.calendarService = calendarService;
        this.loadEvents();

        calendarService.listCalendars();    
    }

    getLoggedIn() {
        return this.userService.getLoggedIn();
    }
    
    getCalendars() {
        return this.calendarService.getCalendars().getValue();
    }

    nextMonth() {
        this.state.add(1, 'month');
        this.loadEvents();
    }

    prevMonth() {
        this.state.subtract(1, 'month');
        this.loadEvents();
    }

    today() {
        this.state = moment();
        this.loadEvents();
    }

    loadEvents() {
        this.days = this.calendarService.getRange(this.state.month(), this.state.year());
        this.title = this.state.format("MMMM YYYY");
        // this.calendarService.listCalendars().then((calendars) => {
        this.calendarService.listUpcomingEvents({from: this.days[0].value.format(),
            to: this.days[this.days.length -1 ].value.format()}).then((results) => {
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
        });
        // });
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
        let title = (!event.sheldon.allDay ? (event.sheldon.start.format('HH:mm') + ' ') : '') + (event.summary || '(No name)');
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
        let selected = find(this.calendarService.remoteEvents.getValue(), (event) => {
            return event.selected;
        });

        if (selected) {
            selected.selected = false;
        }

        event.selected = true;
    }

    toggleNewEvent = () => {
        this.newEventPopupVisible = !this.newEventPopupVisible;
    }

    formatPeriod = (event) => {
        // var DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
        var startDate = event.sheldon.start;
        var endDate = event.sheldon.end;
        var allDay = event.sheldon.allDay;

        var sameDay = startDate.isSame(endDate, 'day');

        var result = startDate.format('DD MMMM YYYY');

        var startTime;

        if (!allDay) {
            if (sameDay) {
                result += ',';
            }

            startTime = startDate.format('HH:mm');
            result += ' ' + startTime;
        }

        var endTime = endDate.format('HH:mm');

        if ((!allDay && startTime != endTime) || !sameDay) {
            result += ' — ';
        }

        if (!sameDay) {
            result += endDate.format('DD MMMM YYYY');
            result += !allDay ? ' ' : '';
        }

        if (!allDay && startTime != endTime) {
            result += endTime;
        }

        return result.trim();
    }
}
