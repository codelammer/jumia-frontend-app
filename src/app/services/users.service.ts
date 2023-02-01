import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = "https://randomuser.me/api/";
  private seed: string = "abc";
  private httpOptions: any = {
    headers: new HttpHeaders({}),
    responseType: 'text'
  }

  constructor(private http: HttpClient) { }

  fetchUsers(page: number, results: number): Observable<any>{
    return this.http.get(`${this.apiUrl}?page=${page}&results=${results}&seed=${this.seed}`);
  }  

  dummyLoggedInUser(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  exportUsers(format: string, page: number, results: number){
    return this.http.get(`${this.apiUrl}?page=${page}&results=${results}&seed=${this.seed}&format=${format}`, this.httpOptions);
  }
}
