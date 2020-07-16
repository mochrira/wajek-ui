import { Injectable, NgZone, Inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as isWebView_import from 'is-webview';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';

const isWebView = isWebView_import;
declare var FirebasePlugin: any;

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseService {

  onMessageReceived: Subject<any> = new Subject();
  isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(null);
  isWebView : boolean = false;

  constructor(
    private ngZone: NgZone,
    @Inject('firebaseConfig') private firebaseConfig: any,
    @Inject('appClientId') private clientId: string
  ) { 
    this.isWebView = isWebView(navigator.userAgent);
  }

  init(){
    if(this.isWebView) {
      this.ngZone.runOutsideAngular(() => {
        FirebasePlugin.onMessageReceived((message) => {
          this.ngZone.run(() => {
            this.onMessageReceived.next(message);
          });
        });
        FirebasePlugin.registerAuthStateChangeListener((isSignedIn) => {
          this.ngZone.run(() => {
            if(isSignedIn) {
              this.isLoggedIn.next(true);
            }else{
              this.isLoggedIn.next(false);
            }
          })
        }, err => {
          this.ngZone.run(() => {
            this.isLoggedIn.next(false);
          })
        });
        FirebasePlugin.isUserSignedIn((isSignedIn) => {
          this.ngZone.run(() => {
            if(isSignedIn) {
              this.isLoggedIn.next(true);
            } else {
              this.isLoggedIn.next(false); 
            }
          });
        });
      });
    }else{
      firebase.initializeApp(this.firebaseConfig);
      // firebase.messaging().onMessage((message) => {
      //   this.onMessageReceived.next(message);  
      // });
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          this.ngZone.run(() => {
            this.isLoggedIn.next(true);
          });
        }else{
          this.ngZone.run(() => {
            this.isLoggedIn.next(false);
          })
        }
      });
    }
  }

  createUserWithEmailAndPassword(email, password): Promise<any> {
    return new Promise(async (resolve,reject) => {
      if(this.isWebView) {
        this.ngZone.runOutsideAngular(() => {
          FirebasePlugin.createUserWithEmailAndPassword(email, password, () => {
            resolve(true);
          }, err => {
            reject(err);
          })
        })
      }else{
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
          resolve(true);
        }).catch(e => {
          reject(e);
        });
      }
    })
  }

  signInWithGoogle(): Promise<any> {
    return new Promise(async (resolve,reject) => {
      if(this.isWebView) {
        this.ngZone.runOutsideAngular(() => {
          FirebasePlugin.authenticateUserWithGoogle(this.clientId, (credential) => {
            FirebasePlugin.signInWithCredential(credential, () => {
              this.ngZone.run(() => {
                this.isLoggedIn.next(true);
                resolve(true);
              });
            }, (err) => {
              this.ngZone.run(() => {
                this.isLoggedIn.next(false);
                reject(err);
              });
            });
          }, (err) => {
            this.ngZone.run(() => {
              this.isLoggedIn.next(false);
              reject(err);
            });
          });
        });
      } else {
        try {
          await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);
          resolve(true);
        } catch(e) {
          reject(e);
        }
      }
    })
  }

  linkWithGoogle(): Promise<any> {
    return new Promise(async (resolve,reject) => {
      if(this.isWebView) {
        this.ngZone.runOutsideAngular(() => {
          FirebasePlugin.authenticateUserWithGoogle(this.clientId, (credential) => {
            FirebasePlugin.linkUserWithCredential(credential, () => {
              this.ngZone.run(() => {
                this.isLoggedIn.next(true);
                resolve(true);
              });
            }, (err) => {
              this.ngZone.run(() => {
                this.isLoggedIn.next(false);
                reject(err);
              });
            });
          }, (err) => {
            this.ngZone.run(() => {
              this.isLoggedIn.next(false);
              reject(err);
            });
          });
        });
      } else {
        try {
          await firebase.auth().currentUser.linkWithPopup(new firebase.auth.GoogleAuthProvider);
          resolve(true);
        } catch(e) {
          reject(e);
        }
      }
    })
  }

  signInWithEmailAndPassword(email, password): Promise<any> {
    return new Promise(async (resolve,reject) => {
      if(this.isWebView) {
        this.ngZone.runOutsideAngular(() => {
          FirebasePlugin.signInUserWithEmailAndPassword(email, password, () => {
            this.ngZone.run(() => {
              this.isLoggedIn.next(true);
              resolve(true);
            })
          }, (err) => {
            this.ngZone.run(() => {
              reject(err);
            })
          })
        })
      }else{
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          resolve(true);
        } catch(e) {
          reject(e);
        }
      }
    })
  }

  signOut(): Promise<any> {
    return new Promise(async (resolve,reject) => {
      if(this.isWebView) {
        this.ngZone.runOutsideAngular(() => {
          FirebasePlugin.signOutUser(() => {
            this.ngZone.run(() => {
              this.isLoggedIn.next(false);
              resolve(true);
            });
          }, (err) => {
            this.ngZone.run(() => {
              reject(err);
            });
          });
        })
      } else {
        try {
          await firebase.auth().signOut();
          resolve(true);
        } catch(e) {
          reject(e);
        }
      }
    });
  }

  getCurrentUser(): Promise<any> {
    return new Promise((resolve,reject) => {
      if(this.isWebView) {
        this.ngZone.runOutsideAngular(() => {
          FirebasePlugin.getCurrentUser((currentUser) => {
            this.ngZone.run(() => {
              resolve(currentUser);
            });
          }, rej => {
            this.ngZone.run(() => {
              reject(rej);
            });
          });
        })
      }else{
        resolve(firebase.auth().currentUser);
      }
    })
  }

  getIdToken(): Promise<any> {
    return new Promise(async (resolve,reject) => {
      if(this.isWebView) {
        this.ngZone.run(() => {
          FirebasePlugin.getCurrentUser((currentUser) => {
            this.ngZone.run(() => {
              resolve(currentUser.idToken);
            })
          }, (error) => {
            this.ngZone.run(() => {
              reject(error);
            })
          })
        })
      }else{
        try {
          let idToken = await firebase.auth().currentUser.getIdToken();
          resolve(idToken);
        } catch(e) {
          reject(e);
        }
      }
    })
  }

  getMessagingToken(): Promise<any> {
    return new Promise(async (resolve,reject) => {
      if(this.isWebView) {
        this.ngZone.runOutsideAngular(() => {
          FirebasePlugin.getToken((fcmToken) => {
            this.ngZone.run(() => {
              resolve(fcmToken);
            })
          }, (err) => {
            this.ngZone.run(() => {
              reject(err);
            })
          });
        })
      }else{
        try {
          let fcmToken = await firebase.messaging().getToken();
          resolve(fcmToken);
        } catch(e) {
          reject(e);
        }
      }
    });
  }

}
