import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UserRoutingModule } from './users-routing.module';
import { UsersPage } from './users.page';

@NgModule({
  declarations: [UsersPage],
  imports: [
    CommonModule,
    IonicModule,
    UserRoutingModule
  ]
})
export class UsersModule { }
