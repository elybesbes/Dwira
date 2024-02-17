import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string ="https://localhost:7108/api/User";

  constructor(private http: HttpClient) { }

  register(registerObj:any){
    return this.http.post<any>(`${this.baseUrl}/register`, registerObj);
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj);
  }

  updateProfileImage(userId: string, imageUrl: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}/profile-image`, {imageUrl});
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getUserInfoFromToken(): any {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
    if (token) {
      try {
        const jwtData = token.split('.')[1];
        const decodedJwt = JSON.parse(atob(jwtData));
        console.log(decodedJwt );
        return decodedJwt;
        
      } catch (e) {
        console.error('Error decoding JWT:', e);
        return null;
      }
    } else {
      return null;
    }
    }
    
  }
  
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

}