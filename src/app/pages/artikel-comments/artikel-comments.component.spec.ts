import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelCommentsComponent } from './artikel-comments.component';

describe('ArtikelCommentsComponent', () => {
  let component: ArtikelCommentsComponent;
  let fixture: ComponentFixture<ArtikelCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtikelCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtikelCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
