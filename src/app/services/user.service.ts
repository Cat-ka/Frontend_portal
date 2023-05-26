import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url + "/user/signup", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  forgotPassword(data: any) {
    return this.httpClient.post(this.url + "/user/forgotPassword", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  login(data: any) {
    return this.httpClient.post(this.url + "/user/login", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  checkToken() {
    return this.httpClient.get(this.url + "/user/checkToken");
  }

  changePassword(data: any) {
    return this.httpClient.post(this.url + "/user/changePassword", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getAllUser() {
    return this.httpClient.get(this.url + "/user/get");
  }

  getAllTeachers() {
    return this.httpClient.get(this.url + "/user/getTeachers");
  }

  getAllTeachersWrap() {
    return this.httpClient.get(this.url + "/user/getTeachersWrap");
  }

  getAll() {
    return this.httpClient.get(this.url + "/user/getAll");
  }

  updateStatus(data: any) {
    return this.httpClient.post(this.url + "/user/updateStatus", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  updateRole(data: any) {
    return this.httpClient.post(this.url + "/user/updateRole", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getCurrentUser(): Observable<String> {
      return this.httpClient.get<{message:string}>(this.url + "/user/profile").pipe(
        map(response=> response.message)
      );
    }

    getCurrentUserInfo() {
      return this.httpClient.get(this.url + "/user/getCurrentUserInfo");
    }

}
