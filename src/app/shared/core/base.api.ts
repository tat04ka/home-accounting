import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseApi {
  private baseURL = 'http://localhost:3200/';

  constructor(public http: HttpClient) {}

  private getUrl(url: string = ''): string {
    return this.baseURL + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
      .pipe(map((data: any) => {
        return data;
      }));
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      .pipe(map((data: any) => {
        return data;
      }));
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data)
      .pipe(map((data: any) => {
        return data;
      }));
  }
}