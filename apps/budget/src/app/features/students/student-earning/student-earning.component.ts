import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { EarningsService } from '../earnings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EarningModel } from '../../../../../../api/src/app/earnings/models/earning.model';

@Component({
  selector: 'schoolbudget-student-earning',
  templateUrl: './student-earning.component.html',
  styleUrls: ['./student-earning.component.scss']
})
export class StudentEarningComponent implements OnInit {
  public earningEditForm: FormGroup;
  public id: string;
  public earning: EarningModel;

  constructor(
    private earningsService: EarningsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.route.snapshot.data?.type !== 'add') {
      this.earningsService
        .retrieve(this.id)
        .subscribe((earning: EarningModel) => {
          this.earning = earning;
          this.earningEditForm.patchValue({
            name: this.earning.name,
            amount: this.earning.amount
          });
        });
    }
    this.earningEditForm = new FormGroup({
      name: new FormControl(''),
      amount: new FormControl(0)
    });
  }

  cancel() {
    this.location.back();
  }

  submit() {
    if (this.route.snapshot.data?.type === 'add') {
      this.earningsService
        .add({ studentId: this.id, ...this.earningEditForm.value } as EarningModel)
        .subscribe(() => {
          this.location.back();
        });
    } else {
      this.earningsService
        .update({ id: this.id, ...this.earningEditForm.value } as EarningModel)
        .subscribe(() => {
          this.location.back();
        });
    }
  }
}
