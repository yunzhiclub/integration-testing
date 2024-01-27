import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditorComponent} from './editor.component';
import {EditorModule} from './editor.module';
import {Component, forwardRef, OnInit} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

@Component({
  template: `
    <app-editor [height]="200"
                [formControl]="formControl"></app-editor>`
})
class TestComponent implements OnInit {
  formControl = new FormControl('');

  ngOnInit(): void {
    this.formControl.setValue(`<h1>Hello</h1><p>I'm a yunzhi'er, welcome to join us!</p>`);
    this.formControl.valueChanges.subscribe(console.log);
  }
}

describe('EditorComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [EditorModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
