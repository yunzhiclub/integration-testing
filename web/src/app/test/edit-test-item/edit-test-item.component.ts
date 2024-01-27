import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-test-item',
  templateUrl: './edit-test-item.component.html',
  styleUrls: ['./edit-test-item.component.css']
})
export class EditTestItemComponent {
  formGroup: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  onSubmit() {

  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
