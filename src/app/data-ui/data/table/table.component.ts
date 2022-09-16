import { Component, OnInit} from '@angular/core';
import {  Router } from '@angular/router';
import { Page } from 'src/app/data/models/page.model';
import { Semantic } from 'src/app/data/models/semantic.model';
import { SemanticService } from 'src/app/data/services/semantic.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'guid', 'path','actions'];
  dataSource!: Semantic[];

  constructor(private router:Router, private semanticService:SemanticService) { }

  ngOnInit(): void {
    this.getSemantics();
  }

  getSemantics(){
    this.semanticService.getSemantics().subscribe(
      (results:any) => {
        console.log(results);
        this.dataSource = results.content;
      }
    )
  }

 /* deleteRowData(rowId:number){
    this.dataSource = this.dataSource.filter((index)=>{
      return index.position != rowId;
    });
  }*/

  backToApps(){
    this.router.navigate(['/apps'])
  }

}
