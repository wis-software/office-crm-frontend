import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { ProfileModel } from './profile.model';
import { PositionModel } from './position.model';
import { SpecializationModel } from './specialization.model';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ws-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {
  private profileForm: FormGroup;
  public profile: ProfileModel;
  public positions: PositionModel[];
  public specializations: SpecializationModel[];

  constructor(private _fb: FormBuilder,
              private _localeService: BsLocaleService,
              private  profileService: ProfileService) {
    this._localeService.use('en-gb');
    this.profileForm = this._fb.group({
      firstName: ['',  Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      workStarted: ['', Validators.required],
      position: ['', Validators.required],
      phoneNumber: [''],
      additionalPhoneNumber: [''],
      email: ['']
    })
  }

  ngOnInit() {
    this.getPositions();
    this.getProfiles();
    this.getSpecializations();
  }

  private getPositions() {
    this.profileService.getPositions()
      .subscribe((results: PositionModel[]) => {
        this.positions = results;
      });
  }

  private getSpecializations() {
    this.profileService.getSpecializations()
      .subscribe((results: SpecializationModel[]) => {
        this.specializations = results;
      })
  }

  private getProfiles() {
    this.profileService.getProfiles()
      .subscribe((results: ProfileModel) => {
        this.profile = new ProfileModel(results);
        this.profileForm.patchValue(this.profile);
      });
  }

  private login() {
    console.log('+');
  }

}
