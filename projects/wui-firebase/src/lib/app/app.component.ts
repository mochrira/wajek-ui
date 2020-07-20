import { Component, OnInit } from '@angular/core';
import { WuiFirebaseAuthService } from '../services/wui-firebase-auth.service';
import { Router } from '@angular/router';
import { WuiService } from '../../../../wui/src/lib/services/wui.service';

@Component({
  selector: 'wui-firebase-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private authService: WuiFirebaseAuthService,
    private wuiService: WuiService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.authService.isLoggedIn.subscribe(async isLoggedIn => {
      if(isLoggedIn == true) {
        try {
          await this.authService.accountInfo();
        } catch(e) {
          if(e.error !== undefined) {
            // if(e.error.code == 'firebase-auth/unverified-number') {
            //   this.router.navigate(['/verify']);
            // }
            // if(e.error.code == 'firebase-auth/invalid-akses') {
            //   this.router.navigate(['/register/undangan']);
            // }
          } else {
            this.wuiService.dialog({
              title: "Error", 
              message: e.message || e.toString(), 
              buttons: ["OK"]
            });
          }
        }
      } else {
        this.isLoggedIn = isLoggedIn;
      }
    })
  }

}
