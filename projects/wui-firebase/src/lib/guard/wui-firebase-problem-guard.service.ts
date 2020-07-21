import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WuiFirebaseAuthService } from '../services/wui-firebase-auth.service';
import { filter, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseProblemGuardService implements CanActivate{

  constructor(
    private authService: WuiFirebaseAuthService
  ) { }

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      catchError(e => {
        if(e.error.code == 'firebase-auth/unverified-number') {
          return of(true);
        }
        if(e.error.code == 'firebase-auth/invalid-akses') {
          return of(true);
        }
        return of(false);
      }),
      tap(hasProblem => {
        console.log(hasProblem);
      })
    );
  }

}


@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseVerifyGuardService implements CanActivate{

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      catchError(e => {
        if(e.error.code == 'firebase-auth/unverified-number') {
          return of(true);
        }
        return of(false);
      }),
      tap(hasProblem => {
        if(!hasProblem) {
          this.router.navigate(['/home'])
        }
      })
    );
  }

}

@Injectable({
  providedIn: 'root'
})
export class WuiFirebaseAksesGuardService implements CanActivate{

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      catchError(e => {
        if(e.error.code == 'firebase-auth/invalid-akses') {
          return of(true);
        }
        return of(false);
      }),
      tap(hasProblem => {
        if(!hasProblem) {
            this.router.navigate(['/home'])
        }
      })
    );
  }

}