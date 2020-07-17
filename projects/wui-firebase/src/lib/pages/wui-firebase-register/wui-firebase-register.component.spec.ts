import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiFirebaseRegisterComponent } from './wui-firebase-register.component';

describe('WuiFirebaseRegisterComponent', () => {
  let component: WuiFirebaseRegisterComponent;
  let fixture: ComponentFixture<WuiFirebaseRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiFirebaseRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiFirebaseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
