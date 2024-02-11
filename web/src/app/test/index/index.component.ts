import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {TestService} from "../../../service/test.service";
import {Page} from "@yunzhi/ng-common";
import {Test} from "../../../entity/test";
import {environment} from "../../../environments/environment";
import {takeUntil} from "rxjs";
import {Assert} from "@yunzhi/utils";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit{
    param = {
      page: 0,
      size: environment.size,
    };

    pageData = new Page<Test>;
    constructor(private testService: TestService) {
      super();
  }
  ngOnInit(): void {
    this.testService.pageAction(this.param).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(data => {
        Assert.isNotNullOrUndefined(data, '数据不能为空或未定义');

        this.pageData = data;
        console.log('数据', data);
      })
  }

  onChangePage(page: number) {
     this.param.page = page;
  }

  onChangeSize(size: number) {
     this.param.page = size;
  }
}
