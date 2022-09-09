import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user';
import { AuthUiService } from 'src/app/auth/shared/auth-ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!:User;

  constructor(private authService:AuthUiService, private router:Router) { 

  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
