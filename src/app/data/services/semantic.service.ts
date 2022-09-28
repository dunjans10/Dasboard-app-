import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap} from 'rxjs';
import { AuthUiService } from 'src/app/auth/shared/services/auth-ui.service';
import { Page } from '../models/page.model';
import { Semantic } from '../models/semantic.model';
import { PageParams, SortParams } from './http-models/request-models';

const apiUrl:string='https://integration4.wolkabout.com';

export interface SemanticFilter {
  query?: string;
}

export interface SemanticPageParams extends SemanticFilter, PageParams, SortParams {}

@Injectable({
  providedIn: 'root'
})
export class SemanticService {

  constructor(private http:HttpClient, private authService:AuthUiService) { }

  getSemantics(params?: SemanticPageParams):Observable<Page<Semantic>>{

      const queryParams = new HttpParams()
        .set('sort', params?.field ? `${params.field},${params.direction}` : "")
        .set('page', params?.page ?? "")
        .set('size', params?.pageSize ?? "");
      


    return this.authService.accessToken$.pipe(
      switchMap(accessToken => {
        
        const headers: HttpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.page+json',
          Authorization: `Bearer ${accessToken}`
        })

        return this.http.get<Page<Semantic>>(`${apiUrl}/api/semantics`, {headers, params:queryParams}).pipe(
          tap(data => console.log(JSON.stringify(data)))
          )    
      })
    )
  }

  deleteSemantic(semanticId:number):Observable<void> {
    return this.authService.accessToken$.pipe(
      switchMap(accessToken => {
        const headers: HttpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.page+json',
          Authorization: `Bearer ${accessToken}`
        })
    return this.http.delete<void>(`${apiUrl}/api/semantics/${semanticId}`, {headers})
      })
    )
  }

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
 
  
}
