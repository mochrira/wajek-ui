import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiFirebaseVerifyPhoneComponent } from './wui-firebase-verify-phone.component';

describe('WuiFirebaseVerifyPhoneComponent', () => {
  let component: WuiFirebaseVerifyPhoneComponent;
  let fixture: ComponentFixture<WuiFirebaseVerifyPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiFirebaseVerifyPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiFirebaseVerifyPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
