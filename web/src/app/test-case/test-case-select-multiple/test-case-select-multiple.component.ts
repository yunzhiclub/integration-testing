import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseComponent} from "../../share/base-component";
import {TestCase} from "../../../entity/test-case";
import {TestCaseService} from "../../../service/test-case.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-test-case-select-multiple',
  templateUrl: './test-case-select-multiple.component.html',
  styleUrls: ['./test-case-select-multiple.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => TestCaseSelectMultipleComponent)
    }
  ]
})
export class TestCaseSelectMultipleComponent extends BaseComponent implements OnInit, ControlValueAccessor {
  testCaseSelect = new FormControl<TestCase[]>(null);
  testCases: TestCase[];

  @Input()
  set data(value: number) {
    if (value !== undefined ){
      this.getTestCaseByProjectId(value)
    }
  }

  constructor(private testCaseService: TestCaseService) {
    super();
  }

  getTestCaseByProjectId(id: number): void{
     this.testCaseService.getTestCaseByProjectId(id).pipe(takeUntil(this.ngOnDestroy$))
       .subscribe(data => {
       this.testCases = data;
     });
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.testCaseSelect.valueChanges.subscribe((testCase: TestCase[]) => {
      fn(testCase);
    })
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: TestCase[]): void {
    if (!obj) return;
    this.testCaseSelect.setValue(obj);
  }

}
