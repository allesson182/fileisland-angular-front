import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = environment.backend;

  constructor(private http: HttpClient) { }



  get(url: string,  headers?: Map<string,string>): Observable<any> {
    let defaultHeaders = headers? this.getDefaultHeaders(headers) : this.getDefaultHeaders();
    return this.http.get(this.baseUrl + url, {headers: defaultHeaders});
  }

post(url: string, body?, headers?: Map<string,string>): Observable<any> {
  let defaultHeaders = headers? this.getDefaultHeaders(headers) : this.getDefaultHeaders();
    return this.http.post(this.baseUrl + url, body, {headers: defaultHeaders});
  }
postFile(url: string, file:File, headers?: Map<string,string>): Observable<any> {
  const headersConfig = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
    'token': localStorage.getItem('token')
  };
  let hd = new HttpHeaders(headersConfig);
  const formData: FormData = new FormData();
  formData.append('userId', headers.get('userId'));
  formData.append('objectKey', headers.get('objectKey'));
  formData.append('file', file, file.name);

  return this.http.post(this.baseUrl + url, formData, {headers: hd});

}


  put(url: string, body?,headers?): Observable<any>{
  let defaultHeaders = headers? this.getDefaultHeaders(headers) : this.getDefaultHeaders();
  return this.http.put(this.baseUrl + url, null, { headers: defaultHeaders});
  }
  delete(url: string, headers?: Map<string,string>): Observable<any> {
    let defaultHeaders = headers? this.getDefaultHeaders(headers) : this.getDefaultHeaders();
    // console.log(defaultHeaders.keys())
    return this.http.delete(this.baseUrl + url, { headers: defaultHeaders});
  }
  private getDefaultHeaders(plusHeaders?: Map<string, string>): HttpHeaders {
    let token = localStorage.getItem('token')? localStorage.getItem('token') : '';
    let headersConfig ={};
    if(token.length > 2) {
       headersConfig = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
        'token': localStorage.getItem('token')? localStorage.getItem('token') : ''
      };
    }else {
       headersConfig = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS'
      };
    }


    if (plusHeaders) {
      plusHeaders.forEach((value, key) => {
        headersConfig[key] = value;
      });}
      return  new HttpHeaders(headersConfig);

  }

  getFile(url: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(this.baseUrl + url, {headers: headers, responseType: 'blob'});
  }
}
