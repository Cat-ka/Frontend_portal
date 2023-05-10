import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemesterprojectService {

  url = environment.apiUrl;
  controls: any;

  constructor(private httpClient: HttpClient) { }

  addSemesterProject(data:any) {
    return this.httpClient.post(this.url + "/semester/add", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
