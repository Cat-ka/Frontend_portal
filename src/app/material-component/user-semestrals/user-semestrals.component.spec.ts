import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSemestralsComponent } from './user-semestrals.component';

describe('UserSemestralsComponent', () => {
  let component: UserSemestralsComponent;
  let fixture: ComponentFixture<UserSemestralsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSemestralsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSemestralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
