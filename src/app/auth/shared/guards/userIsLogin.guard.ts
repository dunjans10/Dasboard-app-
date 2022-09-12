
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthUiService } from '../services/auth-ui.service';

@Injectable({
  providedIn: 'root'
})
//if user is login go to overview page
export class UserIsLogin implements CanActivate {

  constructor(private authService:AuthUiService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      return this.authService.isAuthenticated().pipe( 
        map (data => {
          if(!data){
            this.router.navigate(['/login'])
            return false;
          }   
         
          return true;
      }))
    }


    /*checkLoggedIn():boolean{
      if(this.authService.loginStatus$){
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }*/
      /*return this.authService.isAuthenticated().pipe( 
        map (data => {
          if(data){
            this.router.navigate(['/overview'])
            return true;
          } 
           
          //this.router.navigate(['/login'])
          return false;
      }))*/
  }