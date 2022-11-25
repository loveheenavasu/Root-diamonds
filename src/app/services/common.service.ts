import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable, Subscriber, throwError} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  isSignInModalVisible: boolean = false;
  baseUrl = environment.baseUrl
  // signInModal: any;
  signInModal: any;
  constructor(private http: HttpClient) {}
  get(url: string, extraHeaders: any = {}, privateRoute = true, hasCustomUrl = false): Observable<{ data: any }> {

      const newHeaders = this.routeHeaders(privateRoute, extraHeaders);
      let completeUrl = this.baseUrl + url;
      // If we pass in that we are sending a custom url do not add the base url to it
      if (hasCustomUrl) {
        completeUrl = url;
      }

      return this.http.get(completeUrl,
        {
          observe: 'body',
          headers: newHeaders
        }).pipe(map((response) => {

          const cResponse = <{ data: any }>response;

          return { data: cResponse.data };

      }), catchError( err => {

        return throwError(()=>{} );

      }));
  }

  post(url: string, body: any, extraHeaders: any = {}, privateRoute = true, hasCustomUrl = false,requiresHeader =true): Observable<{ data: any }> {

      const headers = this.routeHeaders(privateRoute, extraHeaders);

      let completeUrl = this.baseUrl + url;
      if (hasCustomUrl) {
        completeUrl = url;
      }
      return this.http.post(completeUrl,
        body,
        {
          observe: 'body',
          headers: requiresHeader ? headers : {}
        }).pipe(map((response) => {
          const cResponse = <{ data: any }>response;
          return { data: cResponse.data };
      }), catchError( err => {
        return throwError(()=>{} );
      }));
  }

  getHeaders() {
    return { 'Content-Type': 'application/json' };
  }
  routeHeaders(privateRoute = true, extraHeaders = {}) {

    let headers = this.getHeaders();
    // if (extraHeaders) {
    //   for (const key of Object.keys(extraHeaders)) {
    //     if (extraHeaders[key]) {
    //       headers[key] = extraHeaders[key];
    //     }
    //   }
    // }

    return headers;
  }
}
