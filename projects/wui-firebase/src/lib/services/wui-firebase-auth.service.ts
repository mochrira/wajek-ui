import { Injectable, Inject } from '@angular/core';
import { Pengguna } from '../models/pengguna';
import * as firebase from 'firebase';
import 'firebase/auth';
import { WuiFirebasePenggunaService } from './wui-firebase-pengguna.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAuthService {

  penggunaAktif: Pengguna;
  isLoggedIn: Subject<boolean> = new Subject();

  constructor(
    private penggunaService: WuiFirebasePenggunaService,
    @Inject('firebaseConfig') private firebaseConfig: any
  ) { 
    firebase.initializeApp(this.firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
      }
    });
  }

  async accountInfo() {
    try {
      let user: firebase.User = firebase.auth().currentUser;
      console.log(user);
      if(user !== null) {
        this.penggunaAktif = await this.penggunaService.row(user.uid);
      }
    } catch(e) {
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
    this.penggunaAktif = null;
  }

}
