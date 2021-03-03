import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
export const JWT_NAME = 'token'
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private registerUrl = 'http://localhost:3001/api/register';
  private loginUrl = 'http://localhost:3001/api/login';
  constructor(private http: HttpClient,public jwtHelper: JwtHelperService) { }
  
  registerUser(user: any){
    return this.http.post<any>(this.registerUrl, user)
  } 
  loginUser(user: any){
    return this.http.post<any>(this.loginUrl, user)
  }
  loggedIn(){
     let token = localStorage.getItem('token')
     if (!token) {
      return null;
    }
    const jwt2 = this.jwtHelper.getTokenExpirationDate(token)
    return !this.jwtHelper.isTokenExpired(token)
  }
  getToken(){
    let token = localStorage.getItem('token')
    if (!token) {
      return false;
    }
    const decode = this.jwtHelper.decodeToken(token)
    const decode1 = decode.subject
    console.log('aa',decode)
    return !!decode1
  }

  logout(){
    //const token = localStorage.getItem('token')
    return localStorage.removeItem('token')
  }
}
