import { ContentChild, Injectable, OnDestroy} from '@angular/core';
import { State, Store } from '@ngrx/store';
import { SemanticService } from 'src/app/data/services/semantic.service';
import { DataState } from '../state/data.state';
import * as dataTableActions from '../state/data.actions'
import { BehaviorSubject, combineLatest, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { selectPage, selectSort } from '../state/data.selectors';
import { Semantic } from 'src/app/data/models/semantic.model';
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
    length:0
  });
  pageSubject$ = this.pageSubject.asObservable();

  private sortSubject = new BehaviorSubject({
    direction:'',
    field:''
  });
  sortSubject$ = this.sortSubject.asObservable();


  page$ = this.store.select(selectPage);
  sort$ = this.store.select(selectSort);

  constructor(private semanticService:SemanticService, private store:Store<State<DataState>>){}

  fetchData$ = combineLatest([
      this.page$, 
      this.sort$
    ]).pipe(

    takeUntil(this.destroyed$),
    switchMap(([page, sort]) => {
      return this.semanticService.getSemantics({...page, ...sort});
    }),

    tap(data => { 
      this.pageSubject.next({ //podaci potrebni za paginaciju backendu
        page:data.pageable.pageNumber,
        pageSize:data.pageable.pageSize,
        length:data.numberOfElements
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
}


