import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, takeUntil} from "rxjs";
import {TestCase} from "../../../entity/test-case";
import {TestCaseService} from "../../../service/test-case.service";
import {TestItem} from "../../../entity/test-item";
import {TestItemService} from "../../../service/test-item.service";
import {CommonService} from "../../../service/common-service";

@Component({
  selector: 'app-add-test-item',
  templateUrl: './add-test-item.component.html',
  styleUrls: ['./add-test-item.component.css']
})
export class AddTestItemComponent extends BaseComponent implements OnInit{
  formGroup: FormGroup;
  testCaseId: number;
  testCase: TestCase;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private testCaseService: TestCaseService,
              private testItemService: TestItemService,
              private commonService: CommonService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl<string>(''),
      steps: new FormControl<string>(''),
      expectedResult: new FormControl<string>('')
    })

    /*获取大项id*/
    this.route.params.pipe(filter(v => v.hasOwnProperty('id')))
      .subscribe(v => {
          this.testCaseId = +v['id'];
          this.testCaseService.getById(this.testCaseId);
        }
      );
    this.initDetail();
  }

  initDetail(): void {
    this.testCaseService.select(TestCaseService.getById).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(value => {
        if (value !== null) {
          this.testCase = value as TestCase;
        }
      } )
  }

  onSubmit() {
    const testItem = this.formGroup.value as TestItem;
    testItem.testCase = this.testCase;

    this.testItemService.addTestItem(testItem).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe({
        next: () => {
          this.commonService.success(() => {
            this.onClose();
          }, '添加成功');
        }, error: (err) => {
          this.commonService.error(() => {
            this.onClose();
          }, '', '添加失败', err);
        }
      });
  }

  onClose() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }
}
