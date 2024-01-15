import {Component, OnInit} from '@angular/core';
import {TestPlan} from "../../../entity/testPlan";
import {Page} from "@yunzhi/ng-common";
import {FormControl, FormGroup} from "@angular/forms";
import {BaseComponent} from "../../share/base-component";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../../service/common-service";
import {filter, takeUntil} from "rxjs";
import {ProjectService} from "../../../service/project.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent extends BaseComponent implements OnInit{
  pageData: Page<TestPlan>;
  name = new FormControl<string>('');
  id: number;
  param = {
    page: 0,
    size: environment.size,
    name: ''
  };
  formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private router: Router,
              private projectService: ProjectService) {
    super();
  }

  ngOnInit(): void {
    console.log('1', this.param)
    this.route.params.pipe(
      filter(params => params.hasOwnProperty('id')))
      .subscribe(params => {
        this.id = +params['id'];
        this.reload();
      });

    this.projectService.select(ProjectService.testPlanPageData)
      .pipe(takeUntil(this.ngOnDestroy$)).subscribe({
      next: (data) => {
        this.pageData = data;
      }
    });
  }

  reload(): void {
    this.projectService.testPlanPageAction(this.id, this.param);
  }

  onChangePage(page: number) {
    this.param.page = page;
    this.reload();
  }

  onChangeSize(size: number) {
    this.param.size = size;
    this.reload();
  }

  onQuery() {
    this.param.name = this.formGroup.get('name').value;
    this.reload();
  }

  onReturn() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  delete(name: string, id: number) {
    this.commonService.confirm(() => {
      this.projectService.deleteTestPlanAction(id).subscribe(() => {
        this.commonService.success(() => {
        }, '删除成功');
      }, error => {
        this.commonService.error(() => {
        }, '删除失败' + error)
      });
    }, '是否删除' + name);
  }
}
