import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {filter} from "rxjs";

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css']
})
export class TestAddComponent implements OnInit{
  formGroup: FormGroup;
  projectId: number
  constructor(private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      projectId: new FormControl<number>(null),
      title: new FormControl<string>(''),
      describe: new FormControl<string>(''),
    })

    this.route.params.pipe(
      filter(params => params.hasOwnProperty('id')))
      .subscribe(params => {
        console.log('params', params)
        this.projectId = +params['id'];
      });
  }

  onClose() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit() {
    console.log(this.router.url);
    console.log('q', this.route.params.pipe(filter(params => params.hasOwnProperty('id'))))

    console.log()
    console.log(this.projectId);

    this.formGroup.get('projectId').setValue(this.projectId);
    console.log(this.formGroup.value);
  }
}
