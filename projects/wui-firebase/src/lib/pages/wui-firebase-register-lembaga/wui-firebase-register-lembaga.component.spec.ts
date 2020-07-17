import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiFirebaseRegisterLembagaComponent } from './wui-firebase-register-lembaga.component';

describe('WuiFirebaseRegisterLembagaComponent', () => {
  let component: WuiFirebaseRegisterLembagaComponent;
  let fixture: ComponentFixture<WuiFirebaseRegisterLembagaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiFirebaseRegisterLembagaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiFirebaseRegisterLembagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
