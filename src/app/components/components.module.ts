import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NavigationComponent } from './navigation/navigation.component';
import { TweetComponent } from './tweet/tweet.component';

@NgModule({
  declarations: [
    NavigationComponent,
    TweetComponent
  ],
  exports: [
    NavigationComponent,
    TweetComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
