import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => RoleSelectComponent)
  }]
})
export class RoleSelectComponent implements OnInit, ControlValueAccessor{
  roleSelect = new FormControl<string>('');

  @Input()
  role: string;

  ngOnInit(): void {
  }

  registerOnChange(fn: (role: string) => void): void {
    this.roleSelect.valueChanges.subscribe((data => {
      fn(data);
    }));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(role: string): void {
    if (role === null) {
      return;
    }
    this.roleSelect.setValue(role);
  }
}
