import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Project} from "../../../entity/project";
import {ProjectService} from "../../../service/project.service";
import {BaseComponent} from "../../share/base-component";
import {takeUntil} from "rxjs";

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
export class ProjectSelectComponent extends BaseComponent implements OnInit, ControlValueAccessor{
  projects: Project[];
  projectSelectId = new FormControl<Project>(null);

  constructor(private projectService: ProjectService) {
    super();
  }

  ngOnInit(): void {
    this.projectService.getAll().pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((data: Project[]) => {
        this.projects = data;
      });
  }

  registerOnChange(fn: (project: Project) => void): void {
    this.projectSelectId.valueChanges
      .subscribe((project: Project) => {
        fn(project);
      });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(project: Project): void {
    if (project == null) return;
    this.projectSelectId.setValue(project);
  }

  compareFn(t1: { id: number }, t2: { id: number }) {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
