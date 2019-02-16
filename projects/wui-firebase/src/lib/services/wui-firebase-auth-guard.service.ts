import { Injectable, NgZone, Inject } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, RouterState, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap, map, takeLast } from 'rxjs/operators';
import { WuiFirebaseAuthService } from './wui-firebase-auth.service';

@Injectable({
  providedIn : 'root'
})
export class WuiFirebaseLoginAuthGuardService implements CanActivate {

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.authService.currentUser && this.authService.isInit) {
      return true;
    } else if (this.authService.currentUser && this.authService.isInit) {
      this.router.navigate(['/home']);
      return false;
    }

    return this.authService.isLoggedIn.pipe(take(1), map(isLoggedIn => !isLoggedIn), tap(notLoggedIn => {
      if (!notLoggedIn) {
        this.router.navigate(['/home']);
      }
    }));
  }

}

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAuthGuardService implements CanActivate {

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router,
    @Inject('wuiFirebaseOptions') private wuiFirebaseOptions: any
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.authService.currentUser) {
      return true;
    }

    return this.authService.isLoggedIn.pipe(take(1), tap(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate([this.wuiFirebaseOptions.loginRoute]);
      }
    }));
  }

}
