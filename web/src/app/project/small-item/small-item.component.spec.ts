import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallItemComponent } from './small-item.component';

describe('SmallItemComponent', () => {
  let component: SmallItemComponent;
  let fixture: ComponentFixture<SmallItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
