import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, takeUntil} from "rxjs";
import {TestItemService} from "../../../service/test-item.service";
import {TestItem} from "../../../entity/test-item";
import {TestCase} from "../../../entity/test-case";
import {CommonService} from "../../../service/common-service";

@Component({
  selector: 'app-edit-test-item',
  templateUrl: './edit-test-item.component.html',
  styleUrls: ['./edit-test-item.component.css']
})
export class EditTestItemComponent extends BaseComponent implements OnInit{
  formGroup: FormGroup;
  testItemId: number;
  testItem: TestItem;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private testItemService: TestItemService,
              private commonService: CommonService) {
    super();
  }

  ngOnInit(): void {
    this.initFromGroup();
    this.route.params.pipe(filter(v => v.hasOwnProperty('id')))
      .subscribe(v => {
          this.testItemId = +v['id'];
          this.testItemService.getById(this.testItemId);
        }
      );
    this.initDetail();
  }

  initDetail(): void {
    this.testItemService.select(TestItemService.getById).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(value => {
        if (value !== null) {
          this.testItem = value;
          this.setFormGroup();
        }
      } )
  }

  setFormGroup(): void {
    this.formGroup.get('name').setValue(this.testItem?.name);
    this.formGroup.get('steps').setValue(this.testItem?.steps);
    this.formGroup.get('expectedResult').setValue(this.testItem?.expectedResult);
  }

  onSubmit() {
    const testItem = this.formGroup.value as TestItem;
    this.testItemService.updateTestItem(this.testItemId, testItem).subscribe({
      next: () => {
        this.commonService.success(() => {
          this.onClose();
        }, '修改成功');
      }, error: (err) => {
        this.commonService.error(() => {
          this.onClose();
        }, '', '修改失败', err);
      }
    });

  }

  onClose() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  initFromGroup(): void{
    this.formGroup = new FormGroup({
      name: new FormControl<string>(''),
      steps: new FormControl<string>(''),
      expectedResult: new FormControl<string>(''),
    });
  }
}
