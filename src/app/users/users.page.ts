import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/users/services/user.service';

@Component({
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
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

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout()
  }

}
