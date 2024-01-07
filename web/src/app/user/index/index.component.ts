import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {FormControl, FormGroup} from "@angular/forms";
import {Page} from "@yunzhi/ng-common";
import {User} from "../../../entity/user";
import {environment} from "../../../environments/environment";
import {UserService} from "../../../service/user.service";
import {takeUntil} from "rxjs";
import {CommonService} from "../../../service/common-service";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit{
  name = new FormControl<string>('');
  pageData = new Page<User>();

  param = {
    page: 0,
    size: environment.size,
    name: ''
  };

  constructor(private userService: UserService,
              private commonService: CommonService) {
    super();
  }
  ngOnInit(): void {
    this.userService.select(UserService.pageData).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe({
        next: (data) => {
          this.pageData = data;
        }
      });
    this.reload();
  }

  delete(name: string, id: number): void {
    this.commonService.confirm(() => {
      this.userService.deleteAction(id).subscribe(() => {
        this.commonService.success(() => {
        }, '删除成功');
      }, error => {
        this.commonService.error(() => {
        }, '删除失败' + error)
      });
    }, '是否删除' + name);
  }

  reload(): void {
    this.userService.pageAction(this.param);
  }

  resetPassword(id: number) {
    this.commonService.confirm(() => {
      this.userService.resetPassword(id).subscribe((data) => {
        this.commonService.success(() => {
        }, '新密码:' + data);
      }, error => {
        this.commonService.error(() => {
        }, '重置密码失败' + error)
      });
    }, '是否重置密码');
  }

  onChangePage(page: number): void {
    this.param.page = page;
    this.reload();
  }

  onChangeSize(size: number): void {
    this.param.size = size;
    this.reload();
  }

  onQuery() {
    this.param.name = "";
    this.reload();
  }
}
