import { TestBed } from '@angular/core/testing';

import { WuiFirebaseService } from './wui-firebase.service';

describe('WuiFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WuiFirebaseService = TestBed.get(WuiFirebaseService);
    expect(service).toBeTruthy();
  });
});
