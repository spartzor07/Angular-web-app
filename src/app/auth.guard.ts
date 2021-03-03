import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private rout: Router){}
  canActivate(){
   if (this.auth.loggedIn()) {
     return true;
   } else {
     this.rout.navigate(['/login']);
     return false;
   } 
   
   
  }
  
}
