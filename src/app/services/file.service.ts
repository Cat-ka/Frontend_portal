import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { SemesterFile } from '../model/semester-file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  uploadFile(formData: FormData): Observable<any>  {
    return this.httpClient.post(this.url + "/upload", formData);
  }

  downloadFile(fileId: number): Observable<any> {
    return this.httpClient.get(this.url + "/files/" + fileId, { responseType: 'blob' as 'json'});
  }

  getFileList(projectId: number): Observable<SemesterFile[]> {
    return this.httpClient.get<SemesterFile[]>(this.url + "/files/" + projectId);
  }

}
