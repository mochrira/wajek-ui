import { TestBed } from '@angular/core/testing';

import { WuiFirebaseAuthService } from './wui-firebase-auth.service';

describe('WuiFirebaseAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WuiFirebaseAuthService = TestBed.get(WuiFirebaseAuthService);
    expect(service).toBeTruthy();
  });
});
