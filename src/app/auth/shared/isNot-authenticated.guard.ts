import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map} from 'rxjs';
import { AuthUiService } from './auth-ui.service';

@Injectable({
  providedIn: 'root'
})

//if user is not login => go to login page
export class IsNotLoginGuard implements CanActivate {

  constructor(private authSevice:AuthUiService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSevice.isAuthenticated().pipe(
      map(data => {
        if(data){
          return true;
        }
         this.router.navigate(['/login'])
         return false;
      })
    );  

    /*if(this.authSevice.loggedIn && localStorage.getItem('refresh_token')){
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }}*/
}

}

