import { TestBed } from '@angular/core/testing';

import { WuiDesktopService } from './wui-desktop.service';

describe('WuiDesktopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WuiDesktopService = TestBed.get(WuiDesktopService);
    expect(service).toBeTruthy();
  });
});
