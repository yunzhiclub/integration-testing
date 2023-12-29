import {Component, OnInit} from '@angular/core';

/**
 * 认证组件
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  /** 当前模式 */
  mode = 'login';

  showUpdateBowerTips: boolean | undefined;

  year = new Date().getFullYear();

  version: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.checkBrowsers();
  }

  onChangeToLogin(): void {
    this.mode = 'login';
  }

  /**
   * 判断是不是需要升级的浏览器
   */
  checkBrowsers(): void {
    const ua = navigator.userAgent.toLowerCase();
    // 如果是IE或者windows版safari，跳转页面
    if (ua.match(/(trident)\/([\d.]+)/) || ua.match(/version\/([\d.]+).*safari/) || ua.match(/msie ([\d.]+)/)) {
      this.showUpdateBowerTips = true;
    }
  }
}
