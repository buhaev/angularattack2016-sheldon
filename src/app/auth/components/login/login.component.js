import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/common';
import { Router } from '@angular/router-deprecated';

import template from './login.template.html';
import { UserService } from '../../services/user/user.service';
import { MdButton } from '@angular2-material/button';

@Component({
  selector: 'login',
  template: template,
  directives: [MdButton]
})
export class LoginComponent {

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  authLogin() {
    this.userService.login().then((result) => {
      if (result) {
        this.router.navigate(['Calendar']);
      }
    });
  }
}
