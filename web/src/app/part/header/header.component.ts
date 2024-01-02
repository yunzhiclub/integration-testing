import {Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../../entity/user";
import {takeUntil} from "rxjs";
import { BaseComponent } from "../../share/base-component";

/**
 * 头部组件
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  environment = environment;
  currentUser: User | undefined;


  constructor(private userService: UserService,
              private router: Router) {
    super();
    this.userService.select(UserService.user).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(user => {
        if (user !== null) {
          this.currentUser = user;
        }
      });
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
