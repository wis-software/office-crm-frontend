import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector:"profile",
  templateUrl: "profile.component.html",
  styleUrls: ["profile.component.scss"]
})

export class ProfileComponent{

  private profileForm: FormGroup;

  constructor(private _fb: FormBuilder) {

    this.profileForm = this._fb.group({
      firstName: ['',  Validators.required],
      lastName: ['', Validators.required],
      startDate: ['', Validators.required],
      position: ['', Validators.required],
      phone: [''],
      address: [''],
      skype: ['']
    })

  }

  private login() {
    console.log("+");
  }

}
