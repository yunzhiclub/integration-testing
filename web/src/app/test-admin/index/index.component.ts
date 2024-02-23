import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {TestService} from "../../../service/test.service";
import {takeUntil} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {Page} from "@yunzhi/ng-common";
import {Test} from "../../../entity/test";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit{
  isShow = false;
  pageData = new Page<Test>;
  param = {
    page: 0,
    size: environment.size,
  };

  constructor(private testService: TestService) {
    super();
  }

  ngOnInit(): void {
    this.testService.select(TestService.pageData).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(data => {
        Assert.isNotNullOrUndefined(data, '数据不能为空或未定义');

        this.pageData = data;
        console.log('pageData', this.pageData.content)
      })

    this.reload();
  }

  toggleCollapse(testId: number) {
    this.testService.toggleCollapse(testId);
  }

  reload(): void {
    this.testService.pageAction(this.param);
  }


  onChangeSize(size: number) {
    this.param.size = size;
    this.reload();
  }

  onChangePage(page: number) {
    this.param.page = page;
    this.reload();
  }
}
