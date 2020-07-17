import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiFirebaseLoginComponent } from './wui-firebase-login.component';

describe('WuiFirebaseLoginComponent', () => {
  let component: WuiFirebaseLoginComponent;
  let fixture: ComponentFixture<WuiFirebaseLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiFirebaseLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiFirebaseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
