import { Component, OnInit } from '@angular/core';
import { AuthUiService } from './auth/shared/services/auth-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'dashboard';

  constructor(private authService:AuthUiService){}

  ngOnInit(): void {
    this.authService.isAuthenticated();
  }
}
