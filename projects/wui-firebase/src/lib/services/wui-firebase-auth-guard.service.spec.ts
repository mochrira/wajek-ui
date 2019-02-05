import { TestBed } from '@angular/core/testing';

import { WuiFirebaseAuthGuardService } from './wui-firebase-auth-guard.service';

describe('WuiFirebaseAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WuiFirebaseAuthGuardService = TestBed.get(WuiFirebaseAuthGuardService);
    expect(service).toBeTruthy();
  });
});
