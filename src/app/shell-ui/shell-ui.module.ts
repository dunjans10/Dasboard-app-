import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Routes, RouterModule } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { NavbarComponent } from './shell/navbar/navbar.component';
import { FooterComponent } from './shell/footer/footer.component';
import { AppsComponent } from './shell/apps/apps.component';


const routes: Routes = [

 { path: '', component: ShellComponent ,
   children: [
    {
    path:'apps', component:AppsComponent, 
    },
   {
     path:'data', loadChildren:() => import('../data-ui/data/data.module').then(m => m.DataModule)},
    
   ],
  
},
{path:'**', redirectTo:'/apps'},



];

@NgModule({
  declarations: [
    ShellComponent,
    NavbarComponent,
    FooterComponent,
    AppsComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule, 
    RouterModule.forChild(routes)
  ]
})
export class ShellUiModule { }
