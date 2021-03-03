import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProdajaComponent } from './prodaja/prodaja.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { AuthenticationService } from './authentication.service';
import { ProizvodService } from './proizvod.service';
import { NapraviNoviComponent } from './napravi-novi/napravi-novi.component';
import { ShoppingService } from './shopping.service';
import { AuthGuard } from './auth.guard';
import { FooterComponent } from './footer/footer.component';
import { CookieService } from 'ngx-cookie-service'
import { JwtModule, JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    PocetnaComponent,
    ProdajaComponent,
    ShoppingCardComponent,
    NapraviNoviComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    JwtModule
  ],
  providers: [AuthenticationService, ProizvodService,
     ShoppingService, AuthGuard, CookieService,JwtHelperService,{provide: JWT_OPTIONS, useValue: JWT_OPTIONS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
