import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take} from 'rxjs';
import { AuthUiService } from '../services/auth-ui.service';

@Injectable({
  providedIn: 'root'
})

//if user is not login => go to login page
export class UserIsNotLogin implements CanActivate {

  constructor(private authService:AuthUiService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    
      return this.authService.isAuthenticated().pipe(
        map(data => {
          if(data){
            return true;
          }
      
      this.router.navigate(['/login'])
      return false;
        })
      );
  }


    /*return this.authSevice.isAuthenticated().pipe(
      map(data => {
        if(data){
          return true;
        }
        this.authService.redirectUrl = url;
    this.router.navigate(['/login'])
    return false;
      })
    );  */

    /*if(this.authSevice.loggedIn && localStorage.getItem('refresh_token')){
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }}*/


}

