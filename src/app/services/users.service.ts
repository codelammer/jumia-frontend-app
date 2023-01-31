import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl: string = "https://randomuser.me/api/";
  seed: string = "abc";

  constructor(private http: HttpClient) { }

  fetchUsers(page: number, results: number): Observable<any>{
    return this.http.get(`${this.apiUrl}?page=${page}&results=${results}&seed=${this.seed}`);
  }  

  dummyLoggedInUser(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
