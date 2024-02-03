import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../../service/common-service";
import {TestPlanService} from "../../../service/test-plan.service";
import {TestPlan} from "../../../entity/testPlan";
import {Project} from "../../../entity/project";
import {TestCase} from "../../../entity/test-case";
import {User} from "../../../entity/user";
import {Task} from "../../../entity/task";

/**
 * 测试计划add组件
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;
  testPlan: TestPlan;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private testPlanService: TestPlanService,
              private commonService: CommonService,) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      project: new FormControl<Project>(null),
      title: new FormControl<string>(''),
      tasks: new FormArray([])
    })

    this.addFormTasks();
  }

  addFormTasks() {
    const tasks = new FormGroup({
      testCase: new FormControl<TestCase[]>(null),
      testUser: new FormControl<User[]>(null),
    });

    (this.formGroup.get('tasks') as FormArray).push(tasks);
  }

  get formTasks() {
    return (this.formGroup.get('tasks') as FormArray).controls;
  }

  removeFormTasks(index: number) {
    (this.formGroup.get('tasks') as FormArray).removeAt(index);
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit() {
    const batchTestPlan: {
      project: Project,
      title: string,
      tasks: Task[]
    } = this.formGroup.value;

    this.testPlanService.batchAddTestPlan(batchTestPlan).subscribe({
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
