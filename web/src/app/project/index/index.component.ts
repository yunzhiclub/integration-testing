import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Page} from "@yunzhi/ng-common";
import {Project} from "../../../entity/project";
import {environment} from "../../../environments/environment";
import {ProjectService} from "../../../service/project.service";
import {takeUntil} from "rxjs";
import {BaseComponent} from "../../share/base-component";
import {CommonService} from "../../../service/common-service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit{
  name = new FormControl<string>('');
  pageData = new Page<Project>();

  param = {
    page: 0,
    size: environment.size,
    name: ''
  };

  constructor(private projectService: ProjectService,
              private commonService: CommonService) {
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
    this.param.name = this.name.value;
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

  delete(name: string, id: number) {
    this.commonService.confirm(() => {
      this.projectService.deleteAction(id).subscribe(() => {
        this.commonService.success(() => {
        }, '删除成功');
      }, error => {
        this.commonService.error(() => {
        }, '删除失败' + error)
      });
    }, '是否删除' + name);
  }
}
