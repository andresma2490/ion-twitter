import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  options = [
    {
      icon:"home",
      name:"home",
      redirectTo:"/home"
    },
    {
      icon: 'person',
      name: 'profile',
      redirectTo: '/profile'
    }
  ]

  show:boolean = true;

  // ToDo
  authorized:boolean = true;

  constructor(public menuController:MenuController, private userService:UserService) {
  }

  ngOnInit() {
    
  }

  logout(){
    this.userService.logout()
  }

  openMenu() {
    this.show = !this.show;
    this.menuController.enable(this.show, 'nav');
    this.menuController.open('nav')
  }
}
