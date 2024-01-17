import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-clone',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.css']
})
export class CloneComponent {
  formGroup: any;
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  onSubmit() {

  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
