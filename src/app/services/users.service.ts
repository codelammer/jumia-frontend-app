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

  fetchUsers(page: number, results: number, filter?: any, ): Observable<any>{
    if (filter) {
      console.log(Object.entries(filter));

      //somehow this API doesn't seem to work with seed when filtering with gender therefore have to remove seed
      //seed is useful in pulling the same set of results - without it the results are random after every pull
      if (Object.entries(filter)[0][0]=="gender") {
        return this.http.get(`${this.apiUrl}?page=${page}&results=${results}&${Object.entries(filter)[0][0]}=${Object.entries(filter)[0][1]}`);
      }
      return this.http.get(`${this.apiUrl}?page=${page}&results=${results}&${Object.entries(filter)[0][0]}=${Object.entries(filter)[0][1]}&seed=${this.seed}`);
    }
    return this.http.get(`${this.apiUrl}?page=${page}&results=${results}&seed=${this.seed}`);
  }  

  dummyLoggedInUser(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  exportUsers(format: string, page: number, results: number){
    return this.http.get(`${this.apiUrl}?page=${page}&results=${results}&seed=${this.seed}&format=${format}`, this.httpOptions);
  }
}
