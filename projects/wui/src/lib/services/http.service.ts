import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WuiHttpService {

  constructor(
    @Inject('apiURL') private apiURL: string,
    private httpClient: HttpClient
  ) { }

  async get(url: string, options: any = {}) {
    let res: any = await this.httpClient.get(this.apiURL + url, options).toPromise();
    return res;
  }

  async post(url: string, data: any = {}, options: any = {}) {
    let res: any = await this.httpClient.post(this.apiURL + url, data, options).toPromise();
    return res;
  }

  async patch(url: string, data: any = {}, options: any = {}) {
    let res: any = await this.httpClient.patch(this.apiURL + url, data, options).toPromise();
    return res;
  }

  async delete(url: string, options: any = {}) {
    let res: any = await this.httpClient.delete(this.apiURL + url, options).toPromise();
    return res;
  }

}
