import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tweets = [
    {
      avatar:'',
      author:'',
      description:'this is a tweet',
      image:''
    },
    {
      avatar:'',
      author:'',
      description:'this is a tweet',
      image:''
    },{},{}
  ]

  constructor() {}

}
