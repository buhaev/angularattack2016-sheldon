import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/common';
import { Router } from '@angular/router-deprecated';

import template from './login.template.html';
import { UserService } from '../../services/user/user.service';
import { validatorFactory } from '../../../posts/validator';

@Component({
  selector: 'login',
  template: template,
  directives: [FORM_DIRECTIVES]
})
export class LoginComponent {

  constructor(userService: UserService, router: Router) {
    this._userService = userService;
    this._router = router;
  }

  authLogin() {
    this._userService.login().then((result) => {
      if (result) {
        this._router.navigate(['List']);
      }
    });
  }
}
