import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = '';
  password:string = '';

  constructor(private userService:UserService){
  }

  ngOnInit(){
  }

  login(){   
    this.userService.login(this.email, this.password);
  }

}
