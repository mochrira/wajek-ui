import { Injectable, Inject } from '@angular/core';
import { WuiFirebaseHttpService } from './wui-firebase-http.service';
import { Pengguna } from '../models/pengguna';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebasePenggunaService {

  constructor(
    @Inject('apiURL') private apiURL: string,
    private httpService: WuiFirebaseHttpService
  ) { }

  async result(): Promise<Pengguna[]> {
    let res: any = await this.httpService.get(this.apiURL + 'pengguna');
    return res.map(item => Pengguna.fromJson(item));
  }

  async row(uid: string): Promise<Pengguna> {
    try {
      let res: any = await this.httpService.get(this.apiURL + 'pengguna/' + uid);
      return Pengguna.fromJson(res);
    } catch(e) {
      throw e;
    }
  }

}
