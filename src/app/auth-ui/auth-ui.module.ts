import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

import { LoginComponent } from 'src/app/auth-ui/login/login.component';


const routes: Routes = [
    { path: '', component: LoginComponent }
  ];

  
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginComponent
    ],
    providers:[]
})
export class AuthModule { }