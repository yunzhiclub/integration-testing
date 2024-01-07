import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../service/common-service";
import {UserService} from "../../../service/user.service";
import {filter, takeUntil} from "rxjs";
import {User} from "../../../entity/user";
import {BaseComponent} from "../../share/base-component";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent extends BaseComponent implements OnInit{
  formGroup: FormGroup;
  id: number;
  user: User;

  key = {
    name: 'name',
    username: 'username',
    contactPhone: 'contactPhone',
    dirtyContactPhone: 'dirtyContactPhone',
    role: 'role'
  }
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,) {
    super();
  }

  ngOnInit(): void {
    this.initFromGroup();
    this.route.params.pipe(filter(v => v.hasOwnProperty('id')))
      .subscribe(v => {
          this.id = +v['id'];
          this.userService.getById(this.id);
        }
      );
    this.initDetail();
  }

  onSubmit() {
    const user = this.formGroup.value as User;
    this.userService.updateAction(this.id, user).subscribe({
      next: () => {
        this.commonService.success(() => {
          this.onClose();
        }, '修改成功');
      }, error: (err) => {
        this.commonService.error(() => {
          this.onClose();
        }, '', '修改失败', err);
      }
    });
  }

  onClose() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  initFromGroup(): void {
    this.formGroup = new FormGroup({
      name: new FormControl<string>(''),
      username: new FormControl<string>(''),
      contactPhone: new FormControl<string>(''),
      dirtyContactPhone: new FormControl<string>(''),
      role: new FormControl<string>('user')
    });
  }

  initDetail(): void {
    this.userService.select(UserService.getById).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(value => {
        if (value !== null) {
          this.user = value;
          this.setFormGroup();
        }
      } )
  }

  setFormGroup(): void {
    this.formGroup.get(this.key.name).setValue(this.user?.name);
    this.formGroup.get(this.key.username).setValue(this.user?.username);
    this.formGroup.get(this.key.contactPhone).setValue(this.user?.contactPhone);
    this.formGroup.get(this.key.dirtyContactPhone).setValue(this.user?.dirtyContactPhone);
    this.formGroup.get(this.key.role).setValue(this.user?.role);
  }
}
