import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(url, options: any = {}, withToken = true): Promise<any> {
    return new Promise((resolve, reject) => {
      if(withToken && localStorage.getItem('token')){
        if (options.headers instanceof HttpHeaders) {
          options.headers.append('Authorization', localStorage.getItem('token'));
        } else {
          options.headers = new HttpHeaders({
            'Authorization': localStorage.getItem('token')
          });
        }
      }
      this.httpClient.get(url, options).subscribe(res => {
        resolve(res);
      }, rej => {
        reject(rej);
      });
    });
  }

  post(url, data = {}, options: any = {}, withToken = true): Promise<any> {
    return new Promise((resolve, reject) => {
      if(withToken && localStorage.getItem('token')){
        if (options.headers instanceof HttpHeaders) {
          options.headers.append('Authorization', localStorage.getItem('token'));
        } else {
          options.headers = new HttpHeaders({
            'Authorization': localStorage.getItem('token')
          });
        }
      }
      this.httpClient.post(url, data, options).subscribe(res => {
        resolve(res);
      }, rej => {
        reject(rej);
      });
    });
  }

  patch(url, data = {}, options: any = {}, withToken = true): Promise<any> {
    return new Promise((resolve, reject) => {
      if(withToken && localStorage.getItem('token')){
        if (options.headers instanceof HttpHeaders) {
          options.headers.append('Authorization', localStorage.getItem('token'));
        } else {
          options.headers = new HttpHeaders({
            'Authorization': localStorage.getItem('token')
          });
        }
      }
      this.httpClient.patch(url, data, options).subscribe(res => {
        resolve(res);
      }, rej => {
        reject(rej);
      });
    });
  }

  delete(url, options: any = {}, withToken = true): Promise<any> {
    return new Promise((resolve, reject) => {
      if(withToken && localStorage.getItem('token')){
        if (options.headers instanceof HttpHeaders) {
          options.headers.append('Authorization', localStorage.getItem('token'));
        } else {
          options.headers = new HttpHeaders({
            'Authorization': localStorage.getItem('token')
          });
        }
      }
      this.httpClient.delete(url, options).subscribe(res => {
        resolve(res);
      }, rej => {
        reject(rej);
      });
    });
  }

}
