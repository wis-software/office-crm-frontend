import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { ProfileModel } from './profile.model';

@Component({
  selector: 'ws-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {
  private profileForm: FormGroup;
  public profile: ProfileModel;

  constructor(private _fb: FormBuilder,
              private  profileService: ProfileService) {

    this.profileForm = this._fb.group({
      firstName: ['',  Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      workStarted: ['', Validators.required],
      position: ['', Validators.required],
      phoneNumber: [''],
      additionalPhoneNumber: [''],
      email: [''],
    })
  }

  ngOnInit() {
    this.profileService.getProfiles()
      .subscribe((results) => {
        this.profile = new ProfileModel(results.employees[0]);
        this.profileForm.patchValue(this.profile);
        console.log(this.profile);
      });
  }

  private login() {
    console.log('+');
  }

}
