import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.css']
})
export class TestEditComponent implements OnInit{
  formGroup: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl<string>(''),
      describe: new FormControl<string>(''),
    })
  }

  onSubmit() {

  }

  onClose() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }
}
