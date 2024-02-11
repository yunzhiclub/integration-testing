import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TestPlanService} from "../../../service/test-plan.service";
import {CommonService} from "../../../service/common-service";
import {TestPlan} from "../../../entity/testPlan";
import {User} from "../../../entity/user";
import {Project} from "../../../entity/project";
import {filter, takeUntil} from "rxjs";
import {TestCaseService} from "../../../service/test-case.service";
import {BaseComponent} from "../../share/base-component";
import {Task} from "../../../entity/task";
import {TestCase} from "../../../entity/test-case";

/**
 * 测试计划edit组件
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent extends BaseComponent implements OnInit{
  /*测试计划的Id*/
  id: number;
  testPlan: TestPlan;
  formGroup: FormGroup;
  key = {
    title: 'title',
    tasks: 'tasks',
    project: 'project',
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testPlanService: TestPlanService,
              private commonService: CommonService) {
    super();
  }
  ngOnInit(): void {
    this.initFormGroup();
    this.addFormTasks();

    this.route.params.pipe(filter(v => v.hasOwnProperty('id')))
      .subscribe(v => {
          this.id = +v['id'];
          this.testPlanService.getById(this.id);
        }
      );

    this.initDetail()
  }

  onClose() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  onSubmit(): void {
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

  initFormGroup() {
    this.formGroup = new FormGroup({
      project: new FormControl<Project>(null),
      title: new FormControl<string>(''),
      tasks: new FormArray([])
    })
  }

  initDetail(): void {
    this.testPlanService.select(TestPlanService.getById).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(value => {
        if (value !== null) {
          this.testPlan = value as TestPlan;
          this.setFormGroup();
        }
      } )
  }

  setFormGroup(): void {
    this.formGroup.get(this.key.project).setValue(this.testPlan?.project);
    this.formGroup.get(this.key.title).setValue(this.testPlan?.title);
    this.formGroup.get(this.key.tasks).setValue(this.testPlan?.tasks);
  }

  addFormTasks() {
    const tasks = new FormGroup({
      testCase: new FormControl<TestCase[]>(null),
      testUser: new FormControl<User>(null),
    });

    (this.formGroup.get('tasks') as FormArray).push(tasks);
  }

  get formTasks () {
    return (this.formGroup.get('tasks') as FormArray).controls;
  }

  removeFormTasks() {
    (this.formGroup.get('tasks') as FormArray).removeAt(this.formTasks.length-1);
  }
}
