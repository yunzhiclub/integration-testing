import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {TestService} from "../../../service/test.service";
import {Page} from "@yunzhi/ng-common";
import {Test} from "../../../entity/test";
import {environment} from "../../../environments/environment";
import {takeUntil} from "rxjs";
import {Assert} from "@yunzhi/utils";
import {UserService} from "../../../service/user.service";
import {User} from "../../../entity/user";

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
      this.testService.select(TestService.pageData).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(data => {
        Assert.isNotNullOrUndefined(data, '数据不能为空或未定义');

        this.pageData = data;
      })

      this.reload();
  }

  reload(): void {
    this.testService.pageAction(this.param);
  }

  onChangePage(page: number) {
     this.param.page = page;
     this.reload();
  }

  onChangeSize(size: number) {
     this.param.page = size;
     this.reload();
  }
}
