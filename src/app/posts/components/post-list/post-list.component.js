import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import template from './post-list.template.html';
import { PostService } from '../../services/post/post.service';
import { CalendarService } from '../../../calendar/services/calendar.service';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';

@Component({
    selector: 'post-list',
    template: template,
    directives: [ROUTER_DIRECTIVES, PostListItemComponent],
    changeDetection: ChangeDetectionStrategy.Detached
})
export class PostListComponent {
    constructor (postService:PostService, CalendarService:CalendarService) {
        this._postService = postService;
        this._calendarService = CalendarService;
    }

    ngOnInit () {
        //this._postService.refreshPosts();
        this._calendarService.listUpcomingEvents();
        //CalendarService
    }

    getRemotePosts () {
        return this._postService.remotePosts;
    }

    getRemoteEvents () {
        console.log(this._calendarService.remoteEvents.value);
        return this._calendarService.remoteEvents;
    }
}
