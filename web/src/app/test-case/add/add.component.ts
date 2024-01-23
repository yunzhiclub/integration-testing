import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../../entity/project";
import {BaseComponent} from "../../share/base-component";
import {TestCase} from "../../../entity/test-case";
import {TestCaseService} from "../../../service/test-case.service";
import {takeUntil} from "rxjs";
import {CommonService} from "../../../service/common-service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent extends BaseComponent implements OnInit{
  formGroup: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private testCaseService: TestCaseService,
              private commonService: CommonService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      project: new FormControl<Project>(null),
      name: new FormControl<string>(''),
      testPurpose: new FormControl<string>(''),
      preconditions: new FormControl<string>('')
    })
  }

  onSubmit() {
    const testCase = this.formGroup.value as TestCase;
    this.testCaseService.addAction(testCase).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe({
        next: () => {
          this.commonService.success(() => {
            this.onClose();
          }, '添加成功');
        }, error: (err) => {
          this.commonService.error(() => {
            this.onClose();
          }, '', '添加失败', err);
        }
      });

  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
