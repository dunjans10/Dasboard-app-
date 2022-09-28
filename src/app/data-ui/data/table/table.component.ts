
import { Component, OnInit} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import { Page } from 'src/app/data/models/page.model';
import { Semantic } from 'src/app/data/models/semantic.model';
import { SemanticService } from 'src/app/data/services/semantic.service';
import { DataViewModel } from './table.view-model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit{

  displayedColumns: string[] = ['name', 'guid', 'path','actions'];
  dataSourcePage!:Page<Semantic>;

  dataSource$ = this.dataService.fetchData$;
  pageEvent!:PageEvent;


  vm$ = combineLatest([
    this.dataSource$,
    this.dataService.page$,
    this.dataService.sort$,
    this.dataService.filter$
   ]).pipe(
        filter((dataSemantics) => Boolean(dataSemantics)), //check 
        map(([semantics, semanticPage, semanticSort, semanticFilter]) =>
          ({semantics, semanticPage,semanticSort, semanticFilter}))
        )
 

  constructor(private router:Router, private semanticService:SemanticService, private dataService:DataViewModel) {

    //this.dataSource$ = dataService.fetchData$
   }

  ngOnInit(): void {
    this.getData()
  }


  getData(){
    this.semanticService.getSemantics().subscribe(
      (results:any) => {
        this.dataSourcePage = results;
      }
    )
  }

  onChangePage(event:PageEvent){

    console.log(event)
  
    let page = event.pageIndex;
    let pageSize = event.pageSize;

    console.log(page);
    console.log(pageSize)
   
    this.dataService.pageChange({page,pageSize})
  }

  onChangeSort(event:Sort){

    let direction = event.direction; //'asc' | 'desc' | ''
    let field = event.active;
    
    console.log(direction);
    console.log(field)

    this.dataService.sortChange({direction, field})
  }

  applyFilter(event:Event){

    console.log(event);

    let query = (event.target as HTMLInputElement).value;
  
    this.dataService.filterChange({query})
  }



 deleteSemantic(semanticId:number) {
    this.semanticService.deleteSemantic(semanticId)
    .subscribe(
  //   () => this.getSemantics(),
    )
  }

  
  backToApps(){
    this.router.navigate(['/apps'])
  }

}
