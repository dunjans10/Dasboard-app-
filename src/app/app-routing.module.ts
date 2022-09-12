import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserIsLogin } from './auth/shared/guards/userIsLogin.guard';
import { UserIsNotLogin } from './auth/shared/guards/userIsNotLogin.guard';

import { OverviewComponent } from './core/overview/overview.component';

const routes: Routes = [

  { path:'login', loadChildren: () => import('../app/auth-ui/auth-ui.module').then(m => m.AuthModule), /*canActivate:[UserIsNotLogin]*/},
  { path:'overview', component: OverviewComponent, canActivate:[UserIsLogin]},
  //{ path:'', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
