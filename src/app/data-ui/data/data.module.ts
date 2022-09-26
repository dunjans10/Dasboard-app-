import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Routes, RouterModule} from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { TableComponent } from './table/table.component';
import * as dataReducer from './state/data.reducer';

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
    StoreModule.forFeature(dataReducer.dataTableFeatureKey, dataReducer.DataTableReducer),
  
    RouterModule.forChild(routes)
  ]
})
export class DataModule { }
