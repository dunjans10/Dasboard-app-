import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';


import { AuthUiService } from './auth/shared/services/auth-ui.service';
import { firstValueFrom } from 'rxjs';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';



export function initializeApp1(appInitService: AuthUiService) {
  return (): Promise<any> => { 
    return firstValueFrom(appInitService.reinitSession())
  }
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  
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
