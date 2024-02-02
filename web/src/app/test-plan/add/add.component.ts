import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../../service/common-service";
import {TestPlanService} from "../../../service/test-plan.service";
import {Project} from "../../../entity/project";

/**
 * 测试计划add组件
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  formGroup: FormGroup;
  /*任务分配的数量*/
  item = [0]

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testPlanService: TestPlanService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      project: new FormControl<Project>(null),
      title: new FormControl<string>(''),
      testCase: new FormControl<string>(''),
      testUser: new FormControl<string>(null),
    });
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit() {
    const testPlan = this.formGroup.value;
    console.log(testPlan, '测试计划')

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

  addItem() {
    this.item.push(2);
  }

  decreaseItem() {
    this.item.splice(this.item.length-1, 1);
  }
}
