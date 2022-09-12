import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { NavbarComponent } from './core/navbar/navbar.component';
import { OverviewComponent } from './core/overview/overview.component';
import { AuthUiService } from './auth/shared/services/auth-ui.service';
import { firstValueFrom } from 'rxjs';

export function initializeApp1(appInitService: AuthUiService) {
  return (): Promise<any> => { 
    return firstValueFrom(appInitService.reinitSession())
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [AuthUiService, 
    {
    provide: APP_INITIALIZER,
    useFactory: initializeApp1,
    deps: [AuthUiService],
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
