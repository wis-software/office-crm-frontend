import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services';


@Component({
  selector: 'wis-auth-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
  ) {
    this.createForm();
  }

  public login() {
    const { username, password } = this.loginForm.value;

    this._authService.login(username, password).subscribe(() => {
      alert('Auth successful');
      this._router.navigate(['']);
    });
  }

  private createForm() {
    this.loginForm = this._fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
    });
  }

}
