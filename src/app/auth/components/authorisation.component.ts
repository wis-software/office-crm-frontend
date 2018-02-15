import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector:"authorisation",
  templateUrl: "authorisation.component.html",
  styleUrls: ["authorisation.component.scss"]
})

export class AuthorisationComponent {

  public greenEye: boolean;
  public loginForm: FormGroup;

  @ViewChild('input') el: ElementRef;

  constructor(private _builder: FormBuilder) {
    this.greenEye = false;
    this.loginForm = this._builder.group(
      {
        'name': [localStorage.getItem('name'), [
          Validators.required,
          Validators.minLength(5)]
        ],
        'password': [localStorage.getItem('password'), [
          Validators.required,
          Validators.minLength(8)]
        ]
      });
  }

  public login() {
    localStorage.setItem('password', this.loginForm.controls['password'].value);
    localStorage.setItem('name',  this.loginForm.controls['name'].value);
  }

  private showPassword() {
    this.greenEye = !this.greenEye;
    let textbox = this.el.nativeElement;
    if(textbox.type === 'text'){
      textbox.type = 'password';
    }else{
      textbox.type = 'text';
    }
  }

}
