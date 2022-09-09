import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsNotLoginGuard } from './auth/shared/isNot-authenticated.guard';

import { OverviewComponent } from './core/overview/overview.component';

const routes: Routes = [

  { path:'login', loadChildren: () => import('../app/auth-ui/auth-ui.module').then(m => m.AuthModule), /*canActivate:[IsLoginGuard]*/},
  { path:'overview', component: OverviewComponent, canActivate:[IsNotLoginGuard]},
  //{ path:'', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
