import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {User} from "../../../entity/user";
import {UserService} from "../../../service/user.service";
import {Project} from "../../../entity/project";
import {takeUntil} from "rxjs";
import {BaseComponent} from "../../share/base-component";

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => UserSelectComponent)
    }
  ]
})
export class UserSelectComponent extends BaseComponent implements OnInit, ControlValueAccessor{
  /*所有的用户*/
  users: User[];
  /*选中的人*/
  userSelects = new FormControl<User>(null);

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    console.log('user ngOnInit')
    this.userService.select(UserService.getAllUser).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(data => {
        if(data !==null) {
          this.users = data
        }
      })

    this.reload();
  }

  reload(): void {
    this.userService.getAllUser();
  }

  registerOnChange(fn: any): void {
    this.userSelects.valueChanges
      .subscribe((user: User) => {
        fn(user);
      });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: User): void {
    console.log('writeValue')
    if (obj === null) return;
    this.userSelects.setValue(obj);
  }

  compareFn(t1: { id: number }, t2: { id: number }) {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
