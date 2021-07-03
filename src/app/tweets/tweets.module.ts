import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TweetComponent } from './components/tweet/tweet.component';


@NgModule({
  declarations: [
    TweetComponent
  ],
  exports: [
    TweetComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class TweetsModule { }
