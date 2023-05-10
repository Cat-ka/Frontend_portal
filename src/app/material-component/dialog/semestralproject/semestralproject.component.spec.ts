import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestralprojectComponent } from './semestralproject.component';

describe('SemestralprojectComponent', () => {
  let component: SemestralprojectComponent;
  let fixture: ComponentFixture<SemestralprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemestralprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemestralprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
