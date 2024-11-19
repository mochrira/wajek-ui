import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelShareComponent } from './artikel-share.component';

describe('ArtikelShareComponent', () => {
  let component: ArtikelShareComponent;
  let fixture: ComponentFixture<ArtikelShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtikelShareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtikelShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
