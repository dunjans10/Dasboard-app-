
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { combineLatest, debounceTime, filter, map, Observable} from 'rxjs';
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

  searchForm!: FormGroup;

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
 

  constructor(private router:Router, private semanticService:SemanticService,
     private dataService:DataViewModel, private fb: FormBuilder) {

    //this.dataSource$ = dataService.fetchData$
    this.searchForm= this.fb.group({
      query:''
      })
      this.onChanges()
   }

  ngOnInit(): void {
    this.getData();  
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

    let direction = event.direction;
    let field = event.active;
    
    console.log(direction);
    console.log(field)

    this.dataService.sortChange({direction, field})
  }

  onChanges():void{
    this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe(val => {
       console.log(val);
       this.dataService.filterChange(val)
       
    })
   }
 
 deleteSemantic(semanticId:number) {

 this.dataService.deleteOneSemantic(semanticId);
  }

  backToApps(){
    this.router.navigate(['/apps'])
  }

}
