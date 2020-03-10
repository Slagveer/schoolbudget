import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExpenseComponent } from './student-expense.component';

describe('StudentExpenseComponent', () => {
  let component: StudentExpenseComponent;
  let fixture: ComponentFixture<StudentExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
