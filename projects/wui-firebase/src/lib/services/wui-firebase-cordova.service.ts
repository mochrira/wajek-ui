import { Injectable, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseCordovaService {

  currentUser: any;
  isLoggedIn: Subject<any> = new Subject();

  constructor(
    @Inject('wuiFirebaseConfig') private config: any
  ) { }

  getAuthInstance() {
    return firebase.auth;
  }

  init() {
    document.addEventListener('deviceready', () => {
      firebase.initializeApp(this.config);
      firebase.auth().onAuthStateChanged(currentUser => {
        this.currentUser = currentUser;
        if (currentUser) {
          this.isLoggedIn.next(true);
        } else {
          this.isLoggedIn.next(false);
        }
      });
      console.log(firebase);
    }, false);
  }

  signInWithEmailAndPassword(email, password): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }).catch(rej => {
        reject(rej);
      });
    });
  }

  signInWithRedirect(provider): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithRedirect(provider).then(res => {
        return firebase.auth().getRedirectResult();
      }).then(res => {
        resolve(res);
      }).catch(rej => {
        reject(rej);
      });
    });
  }

  createUserWithEmailPassword(email, password): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }).catch(rej => {
        reject(rej);
      });
    });
  }

}
