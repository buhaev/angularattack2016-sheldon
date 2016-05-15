import { PostService } from './services/post/post.service';
import { CalendarService } from '../calendar/services/calendar.service';

const POSTS_PROVIDERS = [PostService, CalendarService]; // TODO: убрать

export {
  PostService,
  POSTS_PROVIDERS
};
