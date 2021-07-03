import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersPage } from './users.page';
import { LoginRequired } from '@app/auth/guards/login-required.guard';


const routes: Routes = [
  {
    path: '',
    component: UsersPage,
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
        canActivate: [LoginRequired]
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [LoginRequired]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}

