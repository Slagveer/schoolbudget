import { Component, Input, OnInit } from '@angular/core';
import { StudentModel } from '../../../../../api/src/app/students/models/student.model';
import { StudentsService } from './students.service';
import { BudgetService } from './budget.service';
import { BudgetModel } from '../../../../../api/src/app/budgets/models/budget.model';

@Component({
  selector: 'schoolbudget-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  public students: StudentModel[] = [];
  public totalBudget = 0;

  constructor(
    private studentsService: StudentsService,
    private budgetsService: BudgetService
  ) {}

  ngOnInit(): void {
    this.studentsService.retrieve().subscribe((students: StudentModel[]) => {
      this.students = students;
      this.budgetsService.retrieve().subscribe((budgets: BudgetModel[]) => {
        this.totalBudget = budgets
          .map((budget: BudgetModel) => budget.amount)
          .reduce((budget: number, amount: number) => budget + amount);
      });
    });
  }
}
