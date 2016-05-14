import { RequestService } from './services/request/request.service';
import { UserService } from './services/user/user.service';
import { LoggedInRouterOutletDirective } from './directives/logged-in-router-outlet.directive';

const AUTH_PROVIDERS = [RequestService, UserService];

export {
  RequestService,
  UserService,
  LoggedInRouterOutletDirective,
  AUTH_PROVIDERS
};
