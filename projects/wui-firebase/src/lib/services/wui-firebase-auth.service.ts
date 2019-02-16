import { Injectable, NgZone, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase/app';
import * as isWebView_import from 'is-webview';
import 'firebase/auth';

const isWebView = isWebView_import;

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAuthService {

  isLoggedIn: Subject<any> = new Subject();
  isInit = false;
  currentUser: any;

  constructor(
    private ngZone: NgZone,
    @Inject('wuiFirebaseConfig') private firebaseConfig: any
  ) {
    if (isWebView(navigator.userAgent)) {
      document.addEventListener('deviceready', () => {
        this.init();
      });
    } else {
      this.init();
    }
  }

  init() {
    this.ngZone.runOutsideAngular(() => {
      firebase.initializeApp(this.firebaseConfig);
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
    });
  }

  createUserWithEmailAndPassword(email, password): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ngZone.runOutsideAngular(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
          this.ngZone.run(() => {
            resolve(res);
          });
        }).catch(rej => {
          this.ngZone.run(() => {
            reject(rej);
          });
        });
      });
    });
  }

  signUpWithEmailAndPassword(email, password): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ngZone.runOutsideAngular(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
          this.ngZone.run(() => {
            resolve(res);
          });
        }).catch(rej => {
          this.ngZone.run(() => {
            reject(rej);
          });
        });
      });
    });
  }

  signInWithEmailAndPassword(email, password): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ngZone.runOutsideAngular(() => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
          this.ngZone.run(() => {
            resolve(res);
          });
        }).catch(rej => {
          this.ngZone.run(() => {
            reject(rej);
          });
        });
      });
    });
  }

  signInWithGoogle(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isWebView(navigator.userAgent)) {
        this.ngZone.runOutsideAngular(() => {
          firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(res => {
            return firebase.auth().getRedirectResult();
          }).then(res => {
            this.ngZone.run(() => {
              resolve(res);
            });
          }).catch(rej => {
            this.ngZone.run(() => {
              reject(rej);
            });
          });
        });
      } else {
        this.ngZone.runOutsideAngular(() => {
          firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
            this.ngZone.run(() => {
              resolve(res);
            });
          }).catch(rej => {
            this.ngZone.run(() => {
              reject(rej);
            });
          });
        });
      }
    });
  }

  signInWithFacebook(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isWebView(navigator.userAgent)) {
        this.ngZone.runOutsideAngular(() => {
          firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(res => {
            return firebase.auth().getRedirectResult();
          }).then(res => {
            this.ngZone.run(() => {
              resolve(res);
            });
          }).catch(rej => {
            this.ngZone.run(() => {
              reject(rej);
            });
          });
        });
      } else {
        this.ngZone.runOutsideAngular(() => {
          firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
            this.ngZone.run(() => {
              resolve(res);
            });
          }).catch(rej => {
            this.ngZone.run(() => {
              reject(rej);
            });
          });
        });
      }
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
