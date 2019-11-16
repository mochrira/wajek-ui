import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WuiFirebaseAuthService } from 'wui-firebase';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate{

  constructor(
    private router: Router,
    private wuiFirebaseAuthService: WuiFirebaseAuthService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if(this.wuiFirebaseAuthService.isInit && this.wuiFirebaseAuthService.getFirebaseAuthInstance().currentUser == null) {
      return true;
    }
    
    return this.wuiFirebaseAuthService.isLoggedIn.pipe(
      take(1),
      map(isLoggedIn => {
        return !isLoggedIn;
      }),
      tap(canAccess => {
        if(!canAccess){
          this.router.navigate(['/home']);
        }
      })
    );
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private wuiFirebaseAuthService: WuiFirebaseAuthService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if(this.wuiFirebaseAuthService.isInit && this.wuiFirebaseAuthService.getFirebaseAuthInstance().currentUser !== null) {
      return true;
    }
    
    return this.wuiFirebaseAuthService.isLoggedIn.pipe(
      take(1),
      tap(isLoggedIn => {
        if(!isLoggedIn){
          this.router.navigate(['/login']);
        }
      })
    );
  }

}
