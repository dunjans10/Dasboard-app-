import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Routes, RouterModule } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { NavbarComponent } from './shell/navbar/navbar.component';
import { FooterComponent } from './shell/footer/footer.component';


const routes: Routes = [
  { path: '', component: ShellComponent ,
  children: [{
    path:'shell', component:ShellComponent,
    },
  ]}
];

@NgModule({
  declarations: [
    ShellComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule, 
    RouterModule.forChild(routes)
  ]
})
export class ShellUiModule { }
