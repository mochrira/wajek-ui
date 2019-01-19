import { TestBed } from '@angular/core/testing';

import { WuiService } from './wui.service';

describe('WuiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WuiService = TestBed.get(WuiService);
    expect(service).toBeTruthy();
  });
});
