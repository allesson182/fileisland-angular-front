import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {HttpService} from "./Http.Service";
import {UserService} from "./User.service";

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private httpService: HttpService, private userService:UserService) { }

  downloadFile(objectKey: string, size:string | number): Observable<Blob> {

    const headers = new HttpHeaders()
      .set('Accept', 'application/octet-stream')
      .set('userId', this.userService.getLoggedUser().id.toString())
      .set('objectKey', objectKey)
      .set('token', localStorage.getItem('token'))
      .set('size', size.toString());
    return this.httpService.getFile(`/s3/download`, headers )
  }

  uploadFile(objectKey: string, file: File): Observable<any> {
    var userId = this.userService.getLoggedUser().id
    let headers = new Map<string, string>();
    headers.set('userId', userId.toString());
    headers.set('objectKey', objectKey);
    headers.set('Content-Type', 'multipart/form-data');
    return this.httpService.postFile(`/s3/upload`, file, headers);
  }

  deleteFile(objectKey) {
    let headers = new Map<string, string>();
    headers.set('userId', this.userService.getLoggedUser().id.toString());
    headers.set('objectKey', objectKey);
    return this.httpService.delete(`/s3`, headers);
  }

  listFiles(searchWord: string, page: number, pageSize: number) {
    searchWord = searchWord ? searchWord : '';
    page = page ? page : 0;
    pageSize = pageSize ? pageSize : 10;
    let headers = new Map<string, string>();
    headers.set('userID', this.userService.getLoggedUser().id.toString());
    headers.set('searchWord', searchWord);
    headers.set('page', page.toString());
    headers.set('pageSize', pageSize.toString());

    return this.httpService.get(`/s3/list`,  headers);
  }
}
