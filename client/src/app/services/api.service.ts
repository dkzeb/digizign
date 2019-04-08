import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getTweets() {
    return this.http.get(apiURL + '/api/tweets');
  }

  getSlides() {
    return this.http.get(apiURL + '/api/slides');
  }

  getTime() {
    return this.http.get('http://worldclockapi.com/api/json/cet/now');
  }
}
