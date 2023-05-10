import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSemestralsComponent } from './manage-semestrals.component';

describe('ManageSemestralsComponent', () => {
  let component: ManageSemestralsComponent;
  let fixture: ComponentFixture<ManageSemestralsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSemestralsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSemestralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
