import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Project} from "../../../entity/project";
import {TestCase} from "../../../entity/test-case";
import {ProjectService} from "../../../service/project.service";
import {CommonService} from "../../../service/common-service";

/**
 * 克隆测试用例至其他项目组件
 */
@Component({
  selector: 'app-clone',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.css']
})
export class CloneComponent implements OnInit{
   projectId: number;

  formGroup = new FormGroup({
    project: new FormControl<Project>(null),
    testCases: new FormControl<TestCase[]>(null)
  });
  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
   this.formGroup.get('project').valueChanges.subscribe( () => {
     const project = this.formGroup.get('project').value
     this.projectId = project.id
   })
  }

  onSubmit() {

    const testCases = this.formGroup.get('testCases').value as TestCase[];
    this.projectService.addTestCase(this.projectId, testCases).subscribe({
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
