import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  formGroup: FormGroup;
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl<string>(''),
      username: new FormControl<string>(''),
      contactPhone: new FormControl<string>('')
    });
  }

  onSubmit() {

  }

  onClose() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }


}
