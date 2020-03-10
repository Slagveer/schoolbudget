import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEarningComponent } from './student-earning.component';

describe('StudentEarningComponent', () => {
  let component: StudentEarningComponent;
  let fixture: ComponentFixture<StudentEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentEarningComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
