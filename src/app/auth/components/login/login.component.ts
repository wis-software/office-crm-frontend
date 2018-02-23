import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services';

@Component({
  selector: 'au-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  public  loginForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _auth: AuthService) {
    this.createForm();
  }

  public login() {
    const { username, password } = this.loginForm.value;
    this._auth.login(username, password).subscribe(() => {
      alert('Auth successful');
    });
  }

  private createForm() {
    this.loginForm = this._fb.group(
      {
        username: ['',
          [
            Validators.required,
            Validators.minLength(5)
          ]
        ],
        password: ['',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ]
      }
    );
  }
}
