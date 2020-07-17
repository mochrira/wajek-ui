import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiFirebaseLandingComponent } from './wui-firebase-landing.component';

describe('WuiFirebaseLandingComponent', () => {
  let component: WuiFirebaseLandingComponent;
  let fixture: ComponentFixture<WuiFirebaseLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiFirebaseLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiFirebaseLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
