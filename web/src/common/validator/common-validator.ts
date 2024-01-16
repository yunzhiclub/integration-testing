import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {map, Observable} from "rxjs";
import {UserService} from "../../service/user.service";
import {CommonService} from "../../service/common-service";

@Injectable({
  providedIn: "root"
})
export class CommonValidator {
  static userService: UserService;

  constructor(userService: UserService) {
    CommonValidator.userService = userService;
  }


  /**
   * 验证2次密码是否相等
   */
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const newPasswordAgain = control.get('newPasswordAgain');
    return newPassword && newPasswordAgain && newPassword.value === newPasswordAgain.value ? null : {
      passwordMismatch: true
    };
  };

  /**
   * 验证原密码是否正确
   */
  oldPasswordValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return CommonValidator.userService.checkPasswordIsRight(ctrl.value)
        .pipe(map(data => {
          return data ? null : {passwordError: true};
        }));
    };
  }
}
