import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Project} from "../../../entity/project";
import {ProjectService} from "../../../service/project.service";
import {CommonService} from "../../../service/common-service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private commonService: CommonService) {
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl<string>(''),
      projectUrl: new FormControl<string>(''),
      repositoryUrl: new FormControl<string>('')
    })
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit() {
    const project = this.formGroup.value as Project;

    this.projectService.addAction(project).subscribe({
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
