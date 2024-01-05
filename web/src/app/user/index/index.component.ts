import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {FormControl, FormGroup} from "@angular/forms";
import {Page} from "@yunzhi/ng-common";
import {User} from "../../../entity/user";
import {environment} from "../../../environments/environment";
import {UserService} from "../../../service/user.service";
import {takeUntil} from "rxjs";


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

  constructor(private userService: UserService) {
    super();
  }
  ngOnInit(): void {
    console.log(this.param)
    this.userService.select(UserService.pageData).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe({
        next: (data) => {
          this.pageData = data;
        }
      });
    this.reload();
  }

  reload(): void {
    console.log('reload', this.param)
    this.userService.pageAction(this.param);
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
