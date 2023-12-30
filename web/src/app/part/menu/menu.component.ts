import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BaseMenu} from "../../../entity/base-menu";
import {environment} from 'src/environments/environment';
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {menus} from 'src/conf/menu.config';
import {isNotNullOrUndefined} from "@yunzhi/utils";
/**
 * 菜单组件
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  menus = new Array<BaseMenu>();
  environment = environment;
  private subscription: Subscription | undefined;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }
  ngOnInit(): void {
    this.menus = menus;
  }

  /**
   * 判断当前菜单是否激活
   * @param menu 菜单
   */
  active(menu: BaseMenu): boolean {
    // 截取/的位置
    const start = this.router.url.indexOf('/');
    const end = this.router.url.indexOf('/', start + 1);

    // 定义主路由
    let mainRoute: string;

    // 根据是否有第2个/选择截取方式
    if (end !== -1) {
      mainRoute = this.router.url.substring(start + 1, end);
    } else {
      mainRoute = this.router.url.substring(start + 1, this.router.url.length);
    }

    // 判断当前路由是否激活
    return mainRoute === menu.url;
  }

  getBackgroundColor(menu: BaseMenu): string | undefined {
    if (this.active(menu)) {
      return environment.color;
    }
    return undefined;
  }

  getTextColor(menu: BaseMenu): string | undefined {
    if (this.active(menu)) {
      return 'white';
    }
    return undefined;
  }

  OnDestroy(): void {
    if (isNotNullOrUndefined(this.subscription)) {
      /** 取消订阅 */
      this.subscription.unsubscribe();
    }
  }
}
