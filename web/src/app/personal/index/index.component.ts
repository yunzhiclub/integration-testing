import {Component, OnInit} from '@angular/core';
import {User} from "../../../entity/user";
import {UserService} from "../../../service/user.service";
import {takeUntil} from "rxjs";
import {BaseComponent} from "../../share/base-component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../service/common-service";
import {CommonValidator} from "../../../common/validator/common-validator";

@Component({
  selector: 'app-project',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit {
  user: User;
  formGroup: FormGroup;

  constructor(private userService: UserService,
              private commonService: CommonService,
              private commonValidator: CommonValidator) {
    super();
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.userService.select(UserService.currentUser).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(data => {
        this.user = data;
      });
  }

  initFormGroup(): void {
    this.formGroup = new FormGroup({
      oldPassword: new FormControl<string>('', [Validators.required], this.commonValidator.oldPasswordValidator()),
      newPassword: new FormControl<string>('', [Validators.minLength(6), Validators.maxLength(20)]),
      newPasswordAgain: new FormControl<string>('', [Validators.minLength(6), Validators.maxLength(20)])
    }, {validators: this.commonValidator.passwordMatchValidator});
  }


  onSubmit() {
    const oldPassword = this.formGroup.get('oldPassword').value;
    const newPassword = this.formGroup.get('newPassword').value;

    this.userService.updatePassword(oldPassword, newPassword).subscribe(() => {
      this.commonService.success(() => {
        this.ngOnInit();
      }, '修改成功');
    }, error => {
      this.commonService.error(() => {
      }, '修改失败');
    })
  }
}
