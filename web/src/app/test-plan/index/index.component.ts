import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {FormControl} from "@angular/forms";
import {Page} from "@yunzhi/ng-common";
import {environment} from "../../../environments/environment";
import {takeUntil} from "rxjs";
import {TestPlanService} from "../../../service/test-plan.service";
import {TestPlan} from "../../../entity/testPlan";
import {CommonService} from "../../../service/common-service";

/**
 * 测试计划index组件
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit{
  name = new FormControl<string>('');
  pageData = new Page<TestPlan>();

  param = {
    page: 0,
    size: environment.size,
    name: ''
  };

  constructor(private testPlanService: TestPlanService,
              private commonService: CommonService) {
    super();
  }

  ngOnInit(): void {
    this.testPlanService.select(TestPlanService.pageData).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe({
        next: (data) => {
          this.pageData = data;
        }
      });

    this.reload();
  }

  reload(): void {
    this.testPlanService.pageAction(this.param);
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

  delete(title: string, id: number) {
    this.commonService.confirm(() => {
      this.testPlanService.deleteAction(id).subscribe(() => {
        this.commonService.success(() => {
        }, '删除成功');
      }, error => {
        this.commonService.error(() => {
        }, '删除失败' + error)
      });
    }, '是否删除' + title);
  }
}
