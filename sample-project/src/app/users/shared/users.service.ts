import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel, UserRequestModel } from './users.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUserUrl = `${environment.userBaseUrl+"/users"}`;

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<UserModel[]> {    
    return this.http.get<UserModel[]>(this.baseUserUrl);
  }

  // Get user by ID
  getUserById(id:number): Observable<UserModel> {    
    return this.http.get<UserModel>(`${this.baseUserUrl}/${id}`);
  }

  // Edit user
  editUser(id:number,user:UserRequestModel): Observable<any> {    
    return this.http.put<any>(`${this.baseUserUrl}/${id}`,user);
  }

  // Delete user
  deleteUser(id:number): Observable<any> {    
    return this.http.delete<any>(`${this.baseUserUrl}/${id}`);
  }

  // Create user
  createUser(request:UserRequestModel): Observable<any> {    
    return this.http.post<any>(`${this.baseUserUrl}`,request);
  }
}
