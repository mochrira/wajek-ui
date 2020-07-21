import { Injectable, Inject } from '@angular/core';
import { Pengguna } from '../models/pengguna';
import { Subject, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/auth';
import { WuiFirebasePenggunaService } from './wui-firebase-pengguna.service';
import { WuiService } from '../../../../wui/src/lib/services/wui.service';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAuthService {

  penggunaAktif: Pengguna;
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(
    private penggunaService: WuiFirebasePenggunaService,
    @Inject('wuiFirebaseConfig') private firebaseConfig: any
  ) { 
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      firebase.initializeApp(this.firebaseConfig);
      firebase.auth().onAuthStateChanged(async (user) => {
        if(user !== null){
          try {
            await this.accountInfo();
            resolve(true);
          } catch(e) {
            reject(e);
          }
        } else {
          this.isLoggedIn.next(false);
          resolve(true);
        }
      });
    });
  }

  async accountInfo() {
    try {
      this.penggunaAktif = await this.penggunaService.row(firebase.auth().currentUser.uid);
      this.isLoggedIn.next(true);
      return this.penggunaAktif;
    } catch(e) {
      this.isLoggedIn.error(e);
      throw e;
    }
  }

  async signInEmail(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return await this.accountInfo();
  }

  async signInGoogle() {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);
    return await this.accountInfo();
  }

  async signOut() {
    await firebase.auth().signOut();
  }

}