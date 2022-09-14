import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthUiService } from 'src/app/auth/shared/services/auth-ui.service';
import { User } from 'src/app/auth/models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user$! :Observable<User | null> ;

  constructor(private authService:AuthUiService, private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.user$ = this.authService.activeUser$;
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
    console.log('User is not login')

  }

}
