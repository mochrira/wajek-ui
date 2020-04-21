import { TestBed } from '@angular/core/testing';

import { WuiFirebaseService } from './wui-firebase.service';

describe('FirebaseService', () => {
  let service: WuiFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WuiFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
