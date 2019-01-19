import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiComponent } from './wui.component';

describe('WuiComponent', () => {
  let component: WuiComponent;
  let fixture: ComponentFixture<WuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
