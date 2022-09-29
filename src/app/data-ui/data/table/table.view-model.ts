import { Injectable, OnDestroy} from '@angular/core';
import { State, Store } from '@ngrx/store';
import { SemanticFilter, SemanticService } from 'src/app/data/services/semantic.service';
import { DataState } from '../state/data.state';
import * as dataTableActions from '../state/data.actions'
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import {  selectFilter, selectPage, selectSort } from '../state/data.selectors';
import { PageParams, SortParams } from 'src/app/data/services/http-models/request-models';


@Injectable({
    providedIn: 'root'
  })

  //goal - get semantics for page and sort

export class DataViewModel implements OnDestroy {

  private destroyed$ =new Subject<void>();

  private pageSubject = new BehaviorSubject({
    page:0,
    pageSize:0,
  });
  pageSubject$ = this.pageSubject.asObservable();




  page$ = this.store.select(selectPage);
  sort$ = this.store.select(selectSort);
  filter$ = this.store.select(selectFilter);

  constructor(private semanticService:SemanticService, private store:Store<State<DataState>>){}

 deleteOneSemantic(semanticId:number){
  this.semanticService.deleteSemantic(semanticId).pipe(
    tap((deletedData) => {
      alert('Item is success deleted')
      this.store.dispatch(dataTableActions.deleteSemantic())
     
    }),
    catchError(err => {
      alert('Failed to delete')
      return EMPTY;
    })

  ).subscribe()
 }



  fetchData$ = combineLatest([
      this.page$, 
      this.sort$,
      this.filter$,
    
    
    ]).pipe(

    takeUntil(this.destroyed$),
    switchMap(([page, sort, filter]) => {
  
      return this.semanticService.getSemantics({...page, ...sort, ...filter});
    
    }),

    tap(data => { 
      this.pageSubject.next({ //podaci potrebni za paginaciju backendu
        page:data.pageable.pageNumber,
        pageSize:data.pageable.pageSize
       
      })
    },
 
    ),
  
    map(({content}) => {
      console.log(content);
      return content;
      })
    )

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();

  }

  sortChange(sort:SortParams){
    this.store.dispatch(dataTableActions.setSort({payload:sort}))
  }
  
  pageChange(page:PageParams){
    this.store.dispatch(dataTableActions.setPage({payload:page}))
  }

  filterChange(filter:SemanticFilter){
    this.store.dispatch(dataTableActions.setFilterBy({payload:filter}))
  }



 
}


