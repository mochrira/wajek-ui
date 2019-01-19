import { TestBed } from '@angular/core/testing';

import { WuiMobileService } from './wui-mobile.service';

describe('WuiMobileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WuiMobileService = TestBed.get(WuiMobileService);
    expect(service).toBeTruthy();
  });
});
