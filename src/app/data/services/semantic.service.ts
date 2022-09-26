import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap} from 'rxjs';
import { AuthUiService } from 'src/app/auth/shared/services/auth-ui.service';
import { Page } from '../models/page.model';
import { Semantic } from '../models/semantic.model';

const apiUrl:string='https://integration4.wolkabout.com';

@Injectable({
  providedIn: 'root'
})
export class SemanticService {

  constructor(private http:HttpClient, private authService:AuthUiService) { }

  getSemantics(params?:any):Observable<Page<Semantic[]>>{

      params = {
        params:new HttpParams()

        .set('sort', params.sort ? params.sortDirection : "")
        //.set('sortDirection', params.sortDirection || "")
        .set('page', params?.page || "")
        .set('size', params?.pageSize || "")
      }


    return this.authService.accessToken$.pipe(
      switchMap(accessToken => {
        
        const headers: HttpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.page+json',
          Authorization: `Bearer ${accessToken}`
        })

        return this.http.get<Page<Semantic[]>>(`${apiUrl}/api/semantics`, {headers, params}).pipe(
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
 
  
}
