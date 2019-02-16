import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseHttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(url, options: any = {}, withToken = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const tokenPromise = (withToken ? firebase.auth().currentUser.getIdToken() : new Promise(res => res('')));
      tokenPromise.then((idToken: any) => {
        if (options.headers instanceof HttpHeaders) {
          options.headers.append('Authorization', idToken);
        } else {
          options.headers = new HttpHeaders({
            'Authorization': idToken
          });
        }
        this.httpClient.get(url, options).subscribe(res => {
          resolve(res);
        }, rej => {
          reject(rej);
        });
      });
    });
  }

  post(url, data = {}, options: any = {}, withToken = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const tokenPromise = (withToken ? firebase.auth().currentUser.getIdToken() : new Promise(res => res('')));
      tokenPromise.then((idToken: any) => {
        if (options.headers instanceof HttpHeaders) {
          options.headers.append('Authorization', idToken);
        } else {
          options.headers = new HttpHeaders({
            'Authorization': idToken
          });
        }
        this.httpClient.post(url, data, options).subscribe(res => {
          resolve(res);
        }, rej => {
          reject(rej);
        });
      });
    });
  }

  patch(url, data = {}, options: any = {}, withToken = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const tokenPromise = (withToken ? firebase.auth().currentUser.getIdToken() : new Promise(res => res('')));
      tokenPromise.then((idToken: any) => {
        if (options.headers instanceof HttpHeaders) {
          options.headers.append('Authorization', idToken);
        } else {
          options.headers = new HttpHeaders({
            'Authorization': idToken
          });
        }
        this.httpClient.patch(url, data, options).subscribe(res => {
          resolve(res);
        }, rej => {
          reject(rej);
        });
      });
    });
  }

  delete(url, options: any = {}, withToken = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const tokenPromise = (withToken ? firebase.auth().currentUser.getIdToken() : new Promise(res => res('')));
      tokenPromise.then((idToken: any) => {
        if (options.headers instanceof HttpHeaders) {
          options.headers.append('Authorization', idToken);
        } else {
          options.headers = new HttpHeaders({
            'Authorization': idToken
          });
        }
        this.httpClient.delete(url, options).subscribe(res => {
          resolve(res);
        }, rej => {
          reject(rej);
        });
      });
    });
  }

}
