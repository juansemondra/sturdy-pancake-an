import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BusComponent } from './bus/bus.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './security/login/login.component';
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [AppComponent, BusComponent, NavbarComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    // Removed HttpClientModule
  ],
  providers: [
    AuthService,
    // Removed HTTP_INTERCEPTORS provider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
