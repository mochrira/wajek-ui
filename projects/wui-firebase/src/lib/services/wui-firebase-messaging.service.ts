import { Injectable, NgZone, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import * as isWebView_import from 'is-webview';

const isWebView = isWebView_import;
declare var PushNotification: any;

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseMessagingService {

  push: any;

  constructor(
    private ngZone: NgZone,
    @Inject('wuiFirebaseConfig') private firebaseConfig: any
  ) { }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ngZone.runOutsideAngular(() => {
        if(isWebView()){
          this.push = PushNotification.init({
            android: {}
          });
          this.push.on('registration', data => {
            resolve(data.registrationId);
          }, rej => {
            resolve(rej);
          });
          this.push.on('')
        }else{
          firebase.messaging().usePublicVapidKey(this.firebaseConfig.gcm_web_key);
          firebase.messaging().requestPermission().then(res => {
            firebase.messaging().getToken().then(currentToken => {
              if(currentToken){
                resolve(currentToken);
              }else{
                reject('No instance id');
              }
            })
          }).catch(rej => {
            reject(rej);
          });
        }
      });
    });
  }

}
