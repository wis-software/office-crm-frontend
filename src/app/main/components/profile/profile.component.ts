import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';

@Component({
  selector: 'ws-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {

  private profileForm: FormGroup;
  public profiles: any = {};

  constructor(private _fb: FormBuilder,
              private  profileService: ProfileService) {

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

  ngOnInit() {
    console.log('on init');
    this.profileService.getProfiles()
      .subscribe((results) => {
        this.profiles = results.employees[0];
        this.profileForm.setValue({
          firstName: this.profiles.firstName,
          lastName: this.profiles.lastName,
          startDate: '',
          position: '',
          phone: '',
          address: '',
          skype: ''
        });
        console.log(this.profiles.firstName);
        console.log(this.profiles);
      });
  }

  private login() {
    console.log('+');
  }

}
