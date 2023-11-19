import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private http: HttpClient) { }

  downloadFile(objectKey: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.get(`/download/${objectKey}`, {
      headers: headers,
      responseType: 'blob'
    });
  }

  uploadFile(objectKey: string, file: File): Observable<any> {
    var userId = 'seu-usuario'; // Substitua pelo seu usuário
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(
      `URL_DO_SEU_ENDPOINT/uploadObject/${userId}/${objectKey}`,
      formData
    );
  }

  deleteFile(objectKey) {
    var userId = 'seu-usuario'; // Substitua pelo seu usuário
    return this.http.delete(`URL_DO_SEU_ENDPOINT/deleteObject/${userId}/${objectKey}`);
  }

  listFiles() {
    let body = {}
    return this.http.get(`/s3/list`);
  }
}
