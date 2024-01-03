import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";

/**
 * 登录组件
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  /** 登录表单对象 */
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  /** 错误信息 */
  errorInfo: string | undefined;
  disabled = false;

  /** 提交状态 */
  submitting = false;

  constructor(private userService: UserService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.errorInfo = '';
    this.loginForm.valueChanges
      .subscribe(() => {
        this.errorInfo = '';
      });
  }

  login(): void{
    this.disabled = true;
    const user = {
      username: this.loginForm.get('username')?.value as string,
      password: this.loginForm.get('password')?.value as string,
    };

    this.userService.login(user)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('dashboard').then();
        }, error: (err) => {
          console.log('发生错误', err);
          this.errorInfo = '登录失败，请检查您填写的信息是否正确';
        }
      });
  }
}
