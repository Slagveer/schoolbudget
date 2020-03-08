import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCrudComponent } from './student-crud.component';

describe('StudentCrudComponent', () => {
  let component: StudentCrudComponent;
  let fixture: ComponentFixture<StudentCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCrudComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
