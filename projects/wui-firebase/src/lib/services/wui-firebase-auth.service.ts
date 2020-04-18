import { Injectable, NgZone, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase/app';
import * as isWebView_import from 'is-webview';
import 'firebase/auth';
import 'firebase/messaging';

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
  ) { }

  getFirebaseAuthInstance() {
    return firebase.auth();
  }

  init() {
    firebase.initializeApp(this.firebaseConfig);
    firebase.auth().onAuthStateChanged(currentUser => {
      if (!this.isInit) {
        this.isInit = true;
      }
      if (currentUser) {
        this.currentUser = currentUser;
        this.isLoggedIn.next(true);
      } else {
        this.currentUser = null;
        this.isLoggedIn.next(false);
      }
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

  linkwithFacebook(): Promise<any> {
    return new Promise((resolve,reject) => {
      let isPasswordSet = (firebase.auth().currentUser.providerData.findIndex(p => p.providerId === 'password') > -1);
      if(isPasswordSet){
        if(isWebView(navigator.userAgent)){
          firebase.auth().currentUser.linkWithRedirect(
            new firebase.auth.FacebookAuthProvider()
          ).then(res => {
            return firebase.auth().getRedirectResult();
          }).then(res => {
            resolve(res);
          }).catch(rej => {
            reject(rej);
          });
        }else{
          firebase.auth().currentUser.linkWithPopup(
            new firebase.auth.FacebookAuthProvider()
          ).then(res => {
            resolve(res);
          }).catch(rej => {
            reject(rej);
          });
        }
      }else{
        reject({
          code: 'auth/password-not-set',
          msg: 'Atur password anda terlebih dahulu'
        });
      }
    });
  }

  linkWithGoogle(): Promise<any> {
    return new Promise((resolve,reject) => {
      if(isWebView(navigator.userAgent)){
        firebase.auth().currentUser.linkWithRedirect(
          new firebase.auth.GoogleAuthProvider()
        ).then(res => {
          return firebase.auth().getRedirectResult();
        }).then(res => {
          resolve(res);
        }).catch(rej => {
          reject(rej);
        });
      }else{
        firebase.auth().currentUser.linkWithPopup(
          new firebase.auth.GoogleAuthProvider()
        ).then(res => {
          resolve(res);
        }).catch(rej => {
          reject(rej);
        });
      }
    });
  }

  linkWithEmailAndPassword(email, password): Promise<any> {
    return new Promise((resolve,reject) => {
      firebase.auth().currentUser.linkWithCredential(
        firebase.auth.EmailAuthProvider.credential(email, password)
      ).then(res => {
        resolve(res);
      }).catch(rej => {
        reject(rej);
      })
    })
  }

  reauth(providerId, params: any = {}): Promise<any> {
    return new Promise((resolve,reject) => {
      this.ngZone.runOutsideAngular(() => {
        let provider: any;
        if(providerId === 'google.com'){
          provider = new firebase.auth.GoogleAuthProvider();
        }else if(providerId === 'facebook.com'){
          provider = new firebase.auth.FacebookAuthProvider();
        }else if(providerId === 'password'){
          provider = firebase.auth.EmailAuthProvider.credential(params.email, params.password);
        }
        if(providerId == 'password'){
          firebase.auth().currentUser.reauthenticateWithCredential(provider).then(res => {
            this.ngZone.run(() => {
              resolve(res);
            })
          }).catch(rej => {
            this.ngZone.run(() => {
              reject(rej);
            });
          });
        }else{
          if(isWebView(navigator.userAgent)){
            firebase.auth().currentUser.reauthenticateWithRedirect(provider).then(res => {
              return firebase.auth().getRedirectResult();
            }).then(res => {
              this.ngZone.run(() => {
                resolve(res);
              })
            }).catch(rej => {
              this.ngZone.run(() => {
                reject(rej);
              })
            })
          }else{
            firebase.auth().currentUser.reauthenticateWithPopup(provider).then(res => {
              this.ngZone.run(() => {
                resolve(res);
              })
            }).catch(rej => {
              this.ngZone.run(() => {
                reject(rej);
              })
            })
          }
        }
      });
    })
  }

  unlink(providerId): Promise<any> {
    return new Promise((resolve,reject) => {
      firebase.auth().currentUser.unlink(providerId).then(res => {
        resolve(res);
      }).catch(rej => {
        reject(rej);
      });
    })
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
