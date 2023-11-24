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



  get(url: string, body?, headers?: Map<string,string>): Observable<any> {

    let defaultHeaders = headers? this.getDefaultHeaders(headers) : this.getDefaultHeaders();

    return this.http.get(this.baseUrl + url,  {params: null, headers: defaultHeaders});
  }

post(url: string, body?, headers?): Observable<any> {
    return this.http.post(this.baseUrl + url, body, {headers: headers});
  }

put(url: string, body?,headers?): Promise<any> {
    return this.http.put(this.baseUrl + url, body, {headers: headers}).toPromise();
  }
  delete(url: string, body?,headers?): Promise<any> {
    return this.http.delete(this.baseUrl + url, {params: body, headers: headers}).toPromise();
  }
  private getDefaultHeaders(plusHeaders?: Map<string, string>): HttpHeaders {

    const headersConfig = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'token': localStorage.getItem('token')
    };

    // if (plusHeaders) {
    //   plusHeaders.forEach((value, key) => {
    //     headersConfig[key] = value;
    //   });}
      return  new HttpHeaders(headersConfig);

  }
}
