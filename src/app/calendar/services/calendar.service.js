import { Injectable, Inject, ApplicationRef } from '@angular/core';
import { Http, JSONP_PROVIDERS, Jsonp } from '@angular/http';
import { UserService } from '../../auth/services/user/user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import moment from 'moment';
require('moment-range');


@Injectable()
export class CalendarService {
    multipliers = {
        mm: 1,
        hh: 60,
        dd: 60 * 24,
        ww: 60 * 24 * 7
    };

    remoteEvents = new BehaviorSubject([]);
    calendars = new BehaviorSubject([]);

    constructor (userService:UserService, @Inject('googleApi') googleApi, applicationRef:ApplicationRef) {
        this._googleApi = googleApi;
        this._userService = userService;
        this._applicationRef = applicationRef;

        this._calendarsCache = null;
    }

    getRange (month, year) {
        var value = month !== undefined ? moment({
            month: month,
            year: year
        }) : moment();

        var start = value.clone().startOf('month');
        var startDay = (start.day() === 0 ? 7 : start.day()) - 1;
        var begin = start.subtract(startDay, 'days');
        var end = begin.clone().add(41, 'days');
        return moment.range(begin, end).toArray('days').map((item) => {
            return {
                date: item.date(),
                value: item,
                otherMonth: item.month() !== value.month(),
                isCurrent: item.isSame(moment(), 'day'),
                isWeekend: this.dateIsWeekend(item.day()),
                startOfWeek: item.day() === 1,
                events: []
            }
        });
    }

    dateIsWeekend (day) {
        return day === 0 || day === 6;
    }

    @loggedIn
    createEvent (event, gapi) {

        console.log('BAZINGA', event);

        return new Promise(resolve => {
            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event
            });

            request.execute(function (event) {
                resolve(event);
            });
        });
    }

    @loggedIn
    listCalendars (gapi) {
        if (this._calendarsCache) {
            return this._calendarsCache;
        }

        var request = gapi.client.calendar.calendarList.list({});

        this._calendarsCache = new Promise((resolve, reject) => {
            request.execute((resp) => {
                this.calendars.next(resp.items);
                // console.log(resp.items);
                resolve(resp.items);
            })
        });

        return this._calendarsCache;
    }

    getCalendars () {
        return this.calendars;
    }

    @loggedIn
    listUpcomingEvents ({from, to}, gapi) {
        var request = gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: from || null,
            timeMax: to || null,
            showDeleted: false,
            singleEvents: true,
            orderBy: 'startTime'
        });

        return new Promise((resolve, reject) => {
            request.execute((resp) => {
                resolve(resp.items);

                this.remoteEvents.next(resp.items);

                this._applicationRef.tick();
            });
        });
    }

    getMultiplier (minutes) {
        for (var i = this.multipliers.length - 1; i >= 0; i--) {
            var m = this.multipliers[i];

            if (minutes / m.mult === parseInt(minutes / m.mult, 10)) {
                return {
                    value: parseInt(minutes / m.mult, 10),
                    multiplier: m.id
                };
            }
        }
    }
}

function loggedIn (target, key, descriptor) {
    var method = descriptor.value;
    descriptor.value = function (...args) {
        return new Promise(resolve => {
            this._userService.getLoggedIn().subscribe((isLoggedIn) => {
                isLoggedIn && resolve(this._googleApi);
            });
        }).then(gapi => {
            return new Promise(resolve => {
                gapi.client.load('calendar', 'v3', () => resolve(gapi));
            })
        }).then(gapi => {
            return method.apply(this, args.concat(gapi));
        });
    };
    return descriptor;
}
