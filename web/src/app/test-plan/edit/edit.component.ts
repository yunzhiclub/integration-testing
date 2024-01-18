import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TestPlanService} from "../../../service/test-plan.service";
import {CommonService} from "../../../service/common-service";
import {TestPlan} from "../../../entity/testPlan";

/**
 * 测试计划edit组件
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testPlanService: TestPlanService,
              private commonService: CommonService) {
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      projectId: new FormControl<number>(null),
      title: new FormControl<string>(''),
      describe: new FormControl<string>(''),
    })
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit() {
    const testPlan = this.formGroup.value as TestPlan;

    this.testPlanService.addAction(testPlan).subscribe({
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

}
