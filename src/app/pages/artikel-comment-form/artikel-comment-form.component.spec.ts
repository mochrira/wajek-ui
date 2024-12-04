import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelCommentFormComponent } from './artikel-comment-form.component';

describe('ArtikelCommentFormComponent', () => {
  let component: ArtikelCommentFormComponent;
  let fixture: ComponentFixture<ArtikelCommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtikelCommentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtikelCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
