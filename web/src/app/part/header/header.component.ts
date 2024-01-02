import {Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";

/**
 * 头部组件
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  environment = environment;


  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * 退出系统
   */
  onLogout(): void {
    this.userService.logout()
      .subscribe({
        next: () => {
          this.router.navigateByUrl('login').then();
        }, error: () => {
          this.router.navigateByUrl('login').then();
        }
      });
  }
}
