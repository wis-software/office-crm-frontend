import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector:"main-menu",
  templateUrl: "main-menu.component.html",
  styleUrls: ["main-menu.component.scss"]
})

export class MainMenuComponent implements OnInit{

  @Output() openMenu: EventEmitter<boolean>;
  public open: boolean;

  constructor(public router: Router) {
    this.open = false;
    this.openMenu = new EventEmitter();
  }

  ngOnInit() { }

  public shareDate() {
    this.open = !this.open;
    this.openMenu.emit(this.open);
  }

}
