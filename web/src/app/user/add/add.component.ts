import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../entity/user";
import {UserService} from "../../../service/user.service";
import {CommonService} from "../../../service/common-service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  formGroup: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl<string>(''),
      username: new FormControl<string>(''),
      contactPhone: new FormControl<string>(''),
      role: new FormControl<string>('user'),
    });

  }

  onSubmit() {
    const user = this.formGroup.value as User;

    this.userService.addAction(user).subscribe({
      next: () => {
        this.commonService.success(() => {
          this.onClose();
        }, '添加成功');
      }, error: (err) => {
        this.commonService.error(() => {
          this.onClose();
        }, '', '添加失败', err);
      }
    });
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }


}
