import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WuiFirebaseService } from './wui-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseHttpService {

  constructor(
    private httpClient: HttpClient,
    private firebaseService: WuiFirebaseService
  ) { }

  async get(url, options: any = {}, withToken = true) {
    if(withToken) {
      let idToken = await this.firebaseService.getIdToken();
      options.headers = Object.assign(options.headers || {}, {
        "Authorization": idToken
      });
    }
    return this.httpClient.get(url, options).toPromise();
  }

  async post(url, data = {}, options: any = {}, withToken = true) {
    if(withToken) {
      let idToken = await this.firebaseService.getIdToken();
      options.headers = Object.assign(options.headers || {}, {
        "Authorization": idToken
      });
    }
    return this.httpClient.post(url, data, options).toPromise();
  }

  async patch(url, data = {}, options: any = {}, withToken = true) {
    if(withToken) {
      let idToken = await this.firebaseService.getIdToken();
      options.headers = Object.assign(options.headers || {}, {
        "Authorization": idToken
      });
    }
    return this.httpClient.patch(url, data, options).toPromise();
  }

  async delete(url, options: any = {}, withToken = true) {
    if(withToken) {
      let idToken = await this.firebaseService.getIdToken();
      options.headers = Object.assign(options.headers || {}, {
        "Authorization": idToken
      });
    }
    return this.httpClient.delete(url, options).toPromise();
  }

}
