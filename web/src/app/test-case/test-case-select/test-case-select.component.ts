import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BaseComponent} from "../../share/base-component";
import {TestCase} from "../../../entity/test-case";
import {TestCaseService} from "../../../service/test-case.service";

@Component({
  selector: 'app-test-case-select',
  templateUrl: './test-case-select.component.html',
  styleUrls: ['./test-case-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => TestCaseSelectComponent)
    }
  ]
})
export class TestCaseSelectComponent extends BaseComponent implements OnInit, ControlValueAccessor {
  testCaseSelect = new FormControl<TestCase[]>(null);
  testCases: TestCase[];

  constructor(private testCaseService: TestCaseService) {
    super();
  }

  ngOnInit(): void {
    // 根据选择的项目id,获取测试用例
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

  compareFn(t1: { id: number }, t2: { id: number }) {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
