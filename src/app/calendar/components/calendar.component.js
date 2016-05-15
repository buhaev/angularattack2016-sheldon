import {Component} from '@angular/core';
import moment from 'moment';
require('moment-range');

import template from './calendar.template.html';

import {MdButton} from '@angular2-material/button';

@Component({
    selector: 'calendar',
    template: template,
    styleUrls: ['css/calendar.css'],
    directives: [MdButton]
})
export class CalendarComponent {
    constructor() {
        this.now = moment();
        this.state = {
            month: this.now.month(),
            year: this.now.year()
        };
        this.days = this.getRange();
    }

    getRange(month, year) {
        var value = month !== undefined ? moment({month: month, year: year}) : this.now;

        this.title = value.format("MMMM YYYY");

        var start = value.clone().startOf('month');
        var startDay = (start.day() === 0 ? 7 : start.day()) - 1;
        var begin = start.subtract(startDay, 'days');
        var end = begin.clone().add(41, 'days');
        return moment.range(begin, end).toArray('days').map((item) => {
            return {
                date: item.date(),
                otherMonth: item.month() !== this.state.month,
                isCurrent: item.isSame(this.now, 'day'),
                isWeekend: this.dateIsWeekend(item.day())
            }
        });
    }

    nextMonth() {
        this.state.month += 1;
        this.days = this.getRange(this.state.month, this.state.year);
    }

    dateIsWeekend(day) {
        return day === 0 || day === 6;
    }

    prevMonth() {
        this.state.month -= 1;
        this.days = this.getRange(this.state.month, this.state.year);
    }
}
