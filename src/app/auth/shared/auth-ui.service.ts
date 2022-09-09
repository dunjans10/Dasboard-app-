import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable} from 'rxjs';
import { tap, map } from 'rxjs/operators'
import { Login } from '../models/login';
import { IUser, User } from '../models/user';

const apiUrl:string='https://integration4.wolkabout.com';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 


@Injectable({
  providedIn: 'root'
})

export class AuthUiService {

  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  private userSubject = new BehaviorSubject<User | null>(null);
  activeUser$ = this.userSubject.asObservable();

  private userDataSubject = new BehaviorSubject<IUser | null>(null);
  userData$ = this.userDataSubject.asObservable();

  private accessToken = new BehaviorSubject<string | null>(null);
  accessToken$ = this.accessToken.asObservable();

  private refreshToken = new BehaviorSubject<string | null>(null);
  refreshToken$ = this.refreshToken.asObservable();

  private isUserLogIn = new BehaviorSubject<boolean>(false);
  isUserLogIn$ = this.isUserLogIn.asObservable();

  constructor(private http: HttpClient, private router:Router) {

    const refreshToken =  localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if(refreshToken){
      this.reinitSession(refreshToken)
    }
  }

  login(user:Login):Observable<IUser> {
    
      return this.http.post<IUser>(`${apiUrl}/api/emailSignIn`, user, httpOptions).pipe(
          tap(this.handleResponse)     
    )}


  isAuthenticated():Observable<boolean> {
    
    return this.userSubject.pipe(
      map((data)=> {
        const userAuth = !!data
        console.log('user auth', userAuth)
        return userAuth;
      })
    )
   }
  
    
    //user = null
    // remove user, token from local storage to log user out
    logout(){  
    
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      this.userSubject.next(null);
      this.refreshToken.next(null);
      this.accessToken.next(null);
    }
 
    reinitSession(refreshToken: string) {
      
      return this.http.post<IUser>(`${apiUrl}/api/refreshToken`, refreshToken).pipe
          (tap(this.handleResponse))
        }

    private handleResponse =  (user:IUser) => {
        // login successful if there is a token in the response
     if(user && user.refreshToken){   

        const refreshToken = user.refreshToken;
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)
      
        this.userSubject.next(user.user);
        
        console.log(user)
    
        this.accessToken.next(user.accessList[0].accessToken);
        this.refreshToken.next(user.refreshToken);
        
     } 
    }
}
