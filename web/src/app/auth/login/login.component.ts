import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

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

  ngOnInit(): void {
  }

  login(): void{

  }
}
