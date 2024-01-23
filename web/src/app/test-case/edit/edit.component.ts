import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, takeUntil} from "rxjs";
import {TestCase} from "../../../entity/test-case";
import {TestCaseService} from "../../../service/test-case.service";
import {CommonService} from "../../../service/common-service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent extends BaseComponent implements OnInit{
  formGroup: FormGroup;
  id: number;
  testCase: TestCase;
  key = {
    name: 'name',
    testPurpose: 'testPurpose',
    preconditions: 'preconditions',
    project: 'project'
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testCaseService: TestCaseService,
              private commonService: CommonService) {
    super();
  }

  ngOnInit(): void {
    this.initFromGroup();
    this.route.params.pipe(filter(v => v.hasOwnProperty('id')))
      .subscribe(v => {
          this.id = +v['id'];
          this.testCaseService.getById(this.id);
        }
      );
    this.initDetail();
  }

  initDetail(): void {
    this.testCaseService.select(TestCaseService.getById).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(value => {
        if (value !== null) {
          this.testCase = value;
          this.setFormGroup();
        }
      } )
  }

  setFormGroup(): void {
    this.formGroup.get(this.key.name).setValue(this.testCase?.name);
    this.formGroup.get(this.key.testPurpose).setValue(this.testCase?.testPurpose);
    this.formGroup.get(this.key.preconditions).setValue(this.testCase?.preconditions);
    this.formGroup.get(this.key.project).setValue(this.testCase?.project);
  }

  onSubmit() {
    const testCase = this.formGroup.value as TestCase;
    this.testCaseService.updateAction(this.id, testCase).subscribe({
      next: () => {
        this.commonService.success(() => {
          this.onClose();
        }, '修改成功');
      }, error: (err) => {
        this.commonService.error(() => {
          this.onClose();
        }, '', '修改失败', err);
      }
    });
  }

  onClose() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  initFromGroup(): void{
    this.formGroup = new FormGroup({
      name: new FormControl<string>(''),
      testPurpose: new FormControl<string>(''),
      preconditions: new FormControl<string>(''),
      project: new FormControl<string>('')
    });
  }
}
