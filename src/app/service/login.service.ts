import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginDetails } from '../pages/login/login.component';
import { baseUrl } from './helper';
import { UserData } from './user.service';

export interface tokenData {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 

  }

  // gnerate token
  public generateToke(loginData: loginDetails): Observable<tokenData>{
    return this.http.post<tokenData>(`${baseUrl}/generate-token`,loginData);
  }

  //login user: set token to local user
  public loginUser(token: string): boolean{
    localStorage.setItem('token',token);
    return true;
  }

  // user is logged in or not
  public isLoggedIn(): boolean{
    let token = localStorage.getItem('token')
    if(token){
      return true;
    } 
    return false;
  }

  // logout user from portal
  public logOut(): boolean{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken(): string{
    return localStorage.getItem('token')!;
  }

  //set user detai
  public setUser(user: any): void{
    localStorage.setItem('user',JSON.stringify(user));
  }


// get user details
  public getUser(): UserData| null{
    let user = localStorage.getItem('user');
    if(user){
      return JSON.parse(user);
    } else {
      this.logOut();
      return null;
    }
  }

  //get user role
  public getUserRole(): string{
    let user = this.getUser();
    return user?.authorities[0].authority!;
  }

  //get current user which is logged in
  public getCurrentUser(): Observable<UserData>{
    return this.http.get<UserData>(`${baseUrl}/current-user`);
  }
}
