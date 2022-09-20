
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';

import { Semantic } from 'src/app/data/models/semantic.model';
import { SemanticService } from 'src/app/data/services/semantic.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'guid', 'path','actions'];
  dataSource!: MatTableDataSource<Semantic>;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  data!:any;
  
  constructor(private router:Router, private semanticService:SemanticService) { }

 
  ngOnInit(): void {
    this.getSemantics();
    
  }
  ngAfterViewInit(): void {
    this.getSemantics()
  }


  getSemantics(){
    this.semanticService.getSemantics().subscribe(
      (results:any) => {
        console.log(results)
        this.data = results.content;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  applyFilter(event:Event){
    const filterValue =( event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
   }


 deleteSemantic(semanticId:number) {
    this.semanticService.deleteSemantic(semanticId)
    .subscribe(
     () => this.getSemantics(),
    )
  }

  backToApps(){
    this.router.navigate(['/apps'])
  }

}
