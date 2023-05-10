import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any) {
    return this.httpClient.post(this.url + "/subject/add", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  update(data: any) {
    return this.httpClient.post(this.url + "/subject/update", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  delete(id: any) {
    return this.httpClient.post(this.url + "/subject/delete/" + id, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getSubject(filterValue: number | null = null):Observable<any> {
    let url = this.url + "/subject/get";
  if (filterValue) {
    url += `?filterValue=${filterValue}`;
  }
  return this.httpClient.get<string>(url);
  }

  getSubjectByID(id: any) {
    return this.httpClient.get(this.url + "/subject/get/" + id)
  }
}
