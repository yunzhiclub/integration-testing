import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css']
})
export class TestAddComponent implements OnInit{
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

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit() {

  }
}
