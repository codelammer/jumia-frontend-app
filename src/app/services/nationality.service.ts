import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NationalityService {
  private apiUrl: string = "https://restcountries.com/v3.1/alpha/";

  constructor(private http: HttpClient) { }

  getCountryNames(codes: string[]){
    return this.http.get(this.apiUrl + "?codes=" + codes.join(','));
  }
}
