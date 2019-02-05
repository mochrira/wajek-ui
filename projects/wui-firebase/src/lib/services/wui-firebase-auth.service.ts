import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAuthService {

  isLoggedIn: Subject<any> = new Subject();
  isInit = false;
  currentUser: any;

  constructor(
    private ngZone: NgZone
  ) {
    firebase.auth().onAuthStateChanged(currentUser => {
      this.ngZone.run(() => {
        if (!this.isInit) {
          this.isInit = true;
        }
        if (currentUser) {
          this.currentUser = Object.assign({}, currentUser);
          this.isLoggedIn.next(true);
        } else {
          this.currentUser = null;
          this.isLoggedIn.next(false);
        }
      });
    });
  }

  signInWithEmailandPassword(email, password): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }).catch(rej => {
        reject(rej);
      });
    });
  }

  sendResetPassword(email): Promise<any> {
    return new Promise((resolve, reject) => {

    });
  }

  signInWithFacebook() {
    return new Promise((resolve, reject) => {

    });
  }

  signInWithGoogle(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('halo');
      this.ngZone.run(() => {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider).then(res => {
          resolve(res);
        }).catch(rej => {
          reject(rej);
        });
      });
    });
  }

  signUpEmailPassword(email, password) {
    return new Promise((resolve, reject) => {

    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(res => {
        resolve(res);
      }).catch(rej => {
        reject(rej);
      });
    });
  }

}
