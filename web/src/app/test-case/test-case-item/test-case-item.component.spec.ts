import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseItemComponent } from './test-case-item.component';

describe('TestCaseItemComponent', () => {
  let component: TestCaseItemComponent;
  let fixture: ComponentFixture<TestCaseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
