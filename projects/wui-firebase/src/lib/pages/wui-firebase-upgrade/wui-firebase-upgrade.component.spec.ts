import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WuiFirebaseUpgradeComponent } from './wui-firebase-upgrade.component';

describe('WuiFirebaseUpgradeComponent', () => {
  let component: WuiFirebaseUpgradeComponent;
  let fixture: ComponentFixture<WuiFirebaseUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WuiFirebaseUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WuiFirebaseUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
