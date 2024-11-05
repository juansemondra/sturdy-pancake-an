import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BusComponent } from './bus/bus.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './shared/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './security/login/login.component';

@NgModule({
  declarations: [AppComponent, BusComponent, NavbarComponent, LoginComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
