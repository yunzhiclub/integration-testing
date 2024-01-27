import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestItemComponent } from './edit-test-item.component';

describe('EditTestItemComponent', () => {
  let component: EditTestItemComponent;
  let fixture: ComponentFixture<EditTestItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTestItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
