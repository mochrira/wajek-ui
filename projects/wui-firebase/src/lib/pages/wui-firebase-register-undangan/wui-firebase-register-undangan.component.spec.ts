import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiFirebaseRegisterUndanganComponent } from './wui-firebase-register-undangan.component';

describe('WuiFirebaseRegisterUndanganComponent', () => {
  let component: WuiFirebaseRegisterUndanganComponent;
  let fixture: ComponentFixture<WuiFirebaseRegisterUndanganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiFirebaseRegisterUndanganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiFirebaseRegisterUndanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
