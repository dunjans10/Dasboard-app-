import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Routes, RouterModule } from '@angular/router';

import { TableComponent } from './table/table.component';


const routes:Routes = [
  
    {path:'table', component:TableComponent},
    {path:'**', redirectTo:'table'}
  
]

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class DataModule { }
