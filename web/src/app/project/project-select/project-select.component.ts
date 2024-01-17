import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Project} from "../../../entity/project";
import {ProjectService} from "../../../service/project.service";

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => ProjectSelectComponent)
    }
  ]
})
export class ProjectSelectComponent implements OnInit, ControlValueAccessor{
  projects: Project[]
  projectSelectId = new FormControl<Project>(null);

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    // this.projectService.getAll()
    //   .subscribe((data: Project[]) => {
    //     this.project = data;
    //   });
  }

  registerOnChange(fn: any): void {
    this.projectSelectId.valueChanges
      .subscribe((project: Project) => {
        fn(project);
      });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: Project): void {
    if (!obj) return;
    this.projectSelectId.setValue(obj);
  }

  compareFn(t1: { id: number }, t2: { id: number }) {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}