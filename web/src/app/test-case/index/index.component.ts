import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {Page} from "@yunzhi/ng-common";
import {environment} from "../../../environments/environment";
import {takeUntil} from "rxjs";
import {TestCaseService} from "../../../service/test-case.service";
import {CommonService} from "../../../service/common-service";
import {TestCaseModelService} from "../../../service/test-case-model.service";
import {TestCaseModel} from "../../../entity/test-case-model";

/**
 * 测试用例的大项Index组件
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit{
  isCollapsed = true;
  pageData: Page<TestCaseModel> = new Page<TestCaseModel>();

  param = {
    page: 0,
    size: environment.size,
  };

  constructor(private testCaseService: TestCaseService,
              private testCaseModelService: TestCaseModelService,
              private commonService: CommonService) {
    super();
  }

  ngOnInit(): void {
    this.testCaseModelService.select(TestCaseModelService.pageData).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe({
        next: (data) => {
          this.pageData = data;
        }
      });

    this.reload();
  }

  reload(): void {
    this.testCaseModelService.pageAction(this.param);
  }

  onChangeSize(size: number) {
    this.param.size = size;
    this.reload();
  }

  onChangePage(page: number) {
    this.param.page = page;
    this.reload();
  }

  toggleCollapse(id: number, isShow: boolean | any) {
    if(isShow !== undefined) {
      this.testCaseModelService.toggleCollapse(id, isShow).pipe(takeUntil(this.ngOnDestroy$)).subscribe();
    }
  }

  delete(name: string, id: number) {
    this.commonService.confirm(() => {
      this.testCaseService.deleteAction(id).subscribe(() => {
        this.commonService.success(() => {
        }, '删除成功');
      }, error => {
        this.commonService.error(() => {
        }, '删除失败' + error)
      });
    }, '是否删除' + name);
  }


}
