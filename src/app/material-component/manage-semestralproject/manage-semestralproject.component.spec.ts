import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSemestralprojectComponent } from './manage-semestralproject.component';

describe('ManageSemestralprojectComponent', () => {
  let component: ManageSemestralprojectComponent;
  let fixture: ComponentFixture<ManageSemestralprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSemestralprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSemestralprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
