import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiDesktopComponent } from './wui-desktop.component';

describe('WuiDesktopComponent', () => {
  let component: WuiDesktopComponent;
  let fixture: ComponentFixture<WuiDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
