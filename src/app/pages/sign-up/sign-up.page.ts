import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  newUser = {} as User;
  password:string;

  constructor(private userService:UserService){
  }

  ngOnInit(){
  }

  signUp(){
    this.userService.signUp(this.newUser, this.password);
  }
}
