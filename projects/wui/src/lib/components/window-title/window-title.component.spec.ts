import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTitleComponent } from './window-title.component';

describe('WindowTitleComponent', () => {
  let component: WindowTitleComponent;
  let fixture: ComponentFixture<WindowTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
