import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../pages/signup/signup.component';
import { baseUrl } from './helper';

export interface UserData {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: any;
  password: string;
  enabled: boolean;
  profile?: any;
  authorities: Authority[];
  username: string;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
}

interface Authority {
  authority: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public addUser(user: user): Observable<UserData>{

    return this.http.post<UserData>(`${baseUrl}/user/`, user);

  }
}
