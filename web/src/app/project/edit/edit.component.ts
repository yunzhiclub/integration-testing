import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectService} from "../../../service/project.service";
import {CommonService} from "../../../service/common-service";
import {filter, takeUntil} from "rxjs";
import {Project} from "../../../entity/project";
import {BaseComponent} from "../../share/base-component";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent extends BaseComponent implements OnInit{
  formGroup: FormGroup;
  id: number;
  project: Project;

  key = {
    name: 'name',
    projectUrl: 'projectUrl',
    repositoryUrl: 'repositoryUrl',
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService,
              private commonService: CommonService) {
    super();
  }
  ngOnInit(): void {
    this.initFromGroup();
    this.route.params.pipe(filter(v => v.hasOwnProperty('id')))
      .subscribe(v => {
          this.id = +v['id'];
          this.projectService.getById(this.id);
        }
      );
    this.initDetail();
  }

  onClose() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  onSubmit() {
    const project = this.formGroup.value as Project;
    this.projectService.updateAction(this.id, project).subscribe({
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

  initFromGroup(): void{
    this.formGroup = new FormGroup({
      name: new FormControl<string>(''),
      projectUrl: new FormControl<string>(''),
      repositoryUrl: new FormControl<string>('')
    });
  }

  initDetail(): void {
    this.projectService.select(ProjectService.getById).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(value => {
        if (value !== null) {
          this.project = value;
          this.setFormGroup();
        }
      } )
  }

  setFormGroup(): void {
    this.formGroup.get(this.key.name).setValue(this.project?.name);
    this.formGroup.get(this.key.projectUrl).setValue(this.project?.projectUrl);
    this.formGroup.get(this.key.repositoryUrl).setValue(this.project?.repositoryUrl);
  }

}
