import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WuiFirebaseAuthService } from '../services/wui-firebase-auth.service';
import { filter, catchError, map } from 'rxjs/operators';
import { WuiFirebasePenggunaService } from '../services/wui-firebase-pengguna.service';
import { WuiService } from 'wui';
import { Router } from '@angular/router';
import { Observable, merge, throwError, of } from 'rxjs';

@Component({
  selector: 'wui-firebase-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{

  isLoggedIn = false;

  constructor(
    private authService: WuiFirebaseAuthService,
    private wuiService: WuiService,
    private router: Router
  ) { }

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/landing']);
  }

  ngOnInit() {
    this.authService.isLoggedIn
      .pipe(
        filter(isLoggedIn => isLoggedIn !== null),
        map(isLoggedIn => {
          if((typeof isLoggedIn) !== "boolean") {
            return false;
          }
          return isLoggedIn;
        })
      )
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn
      });
  }

  async ngAfterViewInit() {
    try {
      this.wuiService.openLoading();
      let isLoggedIn = await this.authService.initialize();
      if(isLoggedIn == false) {
        this.router.navigate(['/landing']);
      }
      this.wuiService.closeLoading();
    } catch(e) {
      this.wuiService.closeLoading();
      if(e.error.code == 'firebase-auth/unverified-number') {
        this.router.navigate(['/verify/phone']);
      }
      if(e.error.code == 'firebase-auth/invalid-akses') {
        this.router.navigate(['/register/undangan']);
      }
      if(e.error.code == 'database/need-upgrade') {
        this.router.navigate(['/upgrade']);
      }
    }
  }

}
