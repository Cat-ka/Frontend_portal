import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SemestralsService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllSemesterProjects() {
    return this.httpClient.get(this.url + '/semester/get');
  }

  delete(id: any) {
    return this.httpClient.post(this.url + '/semester/delete/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  updateStatus(data: any) {
    return this.httpClient.post(this.url + '/semester/updateStatus', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getSemesterProjectsForStudent(currentUserId: number) {
    return this.httpClient.get(
      this.url + '/semester/getSemesterProjectsForStudent'
    );
  }

  getSemestersByCurrentUser(currentUserId: number) {
    return this.httpClient.get(
      this.url + '/semester/getSemestersByCurrentUser'
    );    
  }

  uploadFile(data: any) {
    return this.httpClient.post(this.url + '/semester/upload', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
