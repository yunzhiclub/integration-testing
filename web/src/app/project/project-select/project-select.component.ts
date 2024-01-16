import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Project} from "../../../entity/project";
import {BehaviorSubject} from "rxjs";
import {ProjectService} from "../../../service/project.service";

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ProjectSelectComponent)
  }]
})
export class ProjectSelectComponent implements OnInit, ControlValueAccessor {
  projects: Project[];
  projectSelect = new FormControl<Project>(null);
  searchOnChange = new BehaviorSubject<string>('');
  
  constructor(private projectService: ProjectService) {
  
  }
  
  ngOnInit(): void {
    this.searchOnChange.subscribe((name) => {
      this.projectService.getAll(name).subscribe((value => {
        this.projects = value as Project[];
        console.log("c", this.projects);
      }));
    });
  }
  
  registerOnChange(fn: (project: Project) => void): void {
    this.projectSelect.valueChanges.subscribe((data => {
      fn(data);
    }));
  }
  
  registerOnTouched(fn: any): void {
  }
  
  setDisabledState(isDisabled: boolean): void {
  }
  
  writeValue(project: Project): void {
    if (project === null) {
      return;
    }
    
    this.projectSelect.setValue(project);
  }
  
  /**
   * 比较是否一值
   *
   * @param t1
   * @param t2
   */
  compareFn(t1: { id: number }, t2: { id: number }): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
  
  onSearch(name: string): void {
    this.searchOnChange.next(name);
  }
}