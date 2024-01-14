import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {FormControl} from "@angular/forms";
import {Page} from "@yunzhi/ng-common";
import {environment} from "../../../environments/environment";
import {Project} from "../../../entity/project";
import {takeUntil} from "rxjs";
import {ProjectService} from "../../../service/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent extends BaseComponent implements OnInit{
  name = new FormControl<string>('');
  pageData = new Page<Project>();

  param = {
    page: 0,
    size: environment.size,
    name: ''
  };

  constructor(private projectService: ProjectService) {
    super();
  }

  ngOnInit(): void {
    this.projectService.select(ProjectService.pageData).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe({
        next: (data) => {
          this.pageData = data;
        }
      });

    this.reload();
  }

  reload(): void {
    this.projectService.pageAction(this.param);
  }

  onQuery() {
    this.param.name = "";
    this.reload();
  }

  onChangeSize(size: number) {
    this.param.size = size;
    this.reload();
  }

  onChangePage(page: number) {
    this.param.page = page;
    this.reload();
  }

  delete(id: number) {

  }
}
