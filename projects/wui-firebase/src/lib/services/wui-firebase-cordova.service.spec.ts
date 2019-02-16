import { TestBed } from '@angular/core/testing';

import { WuiFirebaseCordovaService } from './wui-firebase-cordova.service';

describe('WuiFirebaseCordovaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WuiFirebaseCordovaService = TestBed.get(WuiFirebaseCordovaService);
    expect(service).toBeTruthy();
  });
});
