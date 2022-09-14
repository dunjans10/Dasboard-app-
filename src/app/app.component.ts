import { Component, OnInit } from '@angular/core';
import { AuthUiService } from './auth/shared/services/auth-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'dashboard';

  constructor(private authService:AuthUiService){}


  isUserAuth = this.authService.isAuthenticated()

 
}
