import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector:"header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.scss"]
})

export class HeaderComponent{

  @Input() open: boolean;

  constructor(public router: Router){
    this.open = false;
  }

  public sendData(data: boolean) {
    this.open = data;
  }

}
