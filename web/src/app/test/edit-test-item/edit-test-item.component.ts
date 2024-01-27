import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-test-item',
  templateUrl: './edit-test-item.component.html',
  styleUrls: ['./edit-test-item.component.css']
})
export class EditTestItemComponent implements OnInit{
  formGroup: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router) {
  }


  onSubmit() {

  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      status: new FormControl<string>(''),
      describe: new FormControl<string>('')
    })
  }
}
