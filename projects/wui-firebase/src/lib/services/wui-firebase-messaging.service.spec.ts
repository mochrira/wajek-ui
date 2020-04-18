import { TestBed } from '@angular/core/testing';

import { WuiFirebaseMessagingService } from './wui-firebase-messaging.service';

describe('WuiFirebaseMessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WuiFirebaseMessagingService = TestBed.get(WuiFirebaseMessagingService);
    expect(service).toBeTruthy();
  });
});
