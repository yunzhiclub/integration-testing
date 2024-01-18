import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Project} from "../../../entity/project";

/**
 * 克隆测试用例至其他项目组件
 */
@Component({
  selector: 'app-clone',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.css']
})
export class CloneComponent {
  formGroup = new FormGroup({
    testCase: new FormControl<Project>(null)
  });
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }


  onSubmit() {

  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
