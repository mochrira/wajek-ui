import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiFirebaseComponent } from './wui-firebase.component';

describe('WuiFirebaseComponent', () => {
  let component: WuiFirebaseComponent;
  let fixture: ComponentFixture<WuiFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
