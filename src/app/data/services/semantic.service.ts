import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap} from 'rxjs';
import { AuthUiService } from 'src/app/auth/shared/services/auth-ui.service';
import { Page } from '../models/page.model';
import { Semantic } from '../models/semantic.model';

const apiUrl:string='https://integration4.wolkabout.com';

@Injectable({
  providedIn: 'root'
})
export class SemanticService {

 /* headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.page+json',
    Authorization:
      'Bearer ${accessToken}',
  });*/
  
  constructor(private http:HttpClient, private authService:AuthUiService) { }

  getSemantics():Observable<Page<Semantic>>{

    return this.authService.accessToken$.pipe(
      switchMap(accessToken => {
        const headers: HttpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.page+json',
          Authorization: `Bearer ${accessToken}`
        })
        return this.http.get<Page<Semantic>>(`${apiUrl}/api/semantics`, {headers}).pipe(
          map((data:Page<Semantic>) =>{
            return data;
          } 
          )
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
