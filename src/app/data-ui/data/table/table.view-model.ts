import { Injectable } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { SemanticService } from 'src/app/data/services/semantic.service';
import { DataState, Page, Sort } from '../state/data.state';
import * as dataTableActions from '../state/data.actions'
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';
import { selectPage, selectSort } from '../state/data.selectors';

@Injectable({
    providedIn: 'root'
  })

  //goal - get semantics for page and sort

export class DataViewModel {

  page$ = this.store.select(selectPage);
  sort$ = this.store.select(selectSort);

    constructor(private semanticService:SemanticService, private store:Store<State<DataState>>){}

    fetchData$ = combineLatest([
        
        this.page$, 
        this.sort$
      ]).pipe(
        switchMap(([page, sort]) => {
         return this.semanticService.getSemantics({page, sort}).pipe(
          tap(data => 
            console.log('data', data))
    
         )
        })
      )
  
   

  sortChange(sort:Sort){

    this.store.dispatch(dataTableActions.setSort({payload:sort}))
    }
  
  pageChange(page:Page){
  
    this.store.dispatch(dataTableActions.setPage({payload:page}))
    }
    }


