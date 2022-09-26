
import { Component, OnInit, ViewChild } from '@angular/core';
//import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

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
  dataSource!:Semantic[];

  constructor(private router:Router, private semanticService:SemanticService, private dataService:DataViewModel) { }

  ngOnInit(): void {
    this.getSemantics();
    
    
  }
 getSemantics(){
      this.dataService.fetchData$.subscribe(
        (results:any) => {
          console.log(results.content)
          this.dataSource = results.content;
        }
      )
  }

  onChangePage(page:PageEvent){
    this.dataService.pageChange()

    //prosledim page iz event-a

    
  }

  //onSortChange(sort:SortE)


  /*sortChange(sort:string){

    if(this.params.sort === sort){
      this.params.sortDirection = 'asc' ? 'desc':'asc';
      this.isAscendingSort= true
      this.isAscendingSort = !this.isAscendingSort;
    }else{
      this.params.sort = sort;
      this.params.sortDirection = 'asc'
      this.isAscendingSort = false
    }
    this.getAll();
  }*/

 deleteSemantic(semanticId:number) {
    this.semanticService.deleteSemantic(semanticId)
    .subscribe(
  //   () => this.getSemantics(),
    )
  }



  /*onSortClick(sort:Sort){
    this.dataService.sortChange(sort)
  }
*/


  
  backToApps(){
    this.router.navigate(['/apps'])
  }

}
