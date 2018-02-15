import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector:"main",
  templateUrl: "main.component.html",
  styleUrls: ["main.component.scss"]
})

export class MainComponent{

  public open: boolean;

  constructor(public router: Router){
    this.open = false;
  }

  public sendData(data: boolean) {
    this.open = data;
  }

}
