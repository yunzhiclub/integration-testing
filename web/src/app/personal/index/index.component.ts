import {Component, OnInit} from '@angular/core';
import {User} from "../../../entity/user";
import {UserService} from "../../../service/user.service";
import {takeUntil} from "rxjs";
import {BaseComponent} from "../../share/base-component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit{
  user: User | undefined;

  constructor(private userService: UserService) {
    super();
  }
  ngOnInit(): void {
    this.userService.select(UserService.user).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(data => {
        this.user = data;
      });
  }

}
