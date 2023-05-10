import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserSemestralsService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getPublishedProjects() {
    return this.httpClient.get(this.url + "/semester/getPublished");
  }

  assignProject(data: any) {
    return this.httpClient.post(this.url + "/semester/assign", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getCurrentUser() {
    return this.httpClient.get(this.url + "/semester/currentUser");
  }

  cancelProject(data: any) {
    return this.httpClient.post(this.url + "/semester/cancel", { id: data }, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getPublishedProjectById(id: number): Observable<any> {
    return this.httpClient.get(this.url + "/semester/project/" + id);
  }
}
