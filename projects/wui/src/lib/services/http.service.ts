import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WuiHttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async get(url: string, options: any = {}) {
    let res: any = await this.httpClient.get(url, options).toPromise();
    return res;
  }

  async post(url: string, data: any = {}, options: any = {}) {
    let res: any = await this.httpClient.post(url, data, options).toPromise();
    return res;
  }

  async patch(url: string, data: any = {}, options: any = {}) {
    let res: any = await this.httpClient.patch(url, data, options).toPromise();
    return res;
  }

  async delete(url: string, options: any = {}) {
    let res: any = await this.httpClient.delete(url, options).toPromise();
    return res;
  }

}
