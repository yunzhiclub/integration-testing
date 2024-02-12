import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {ActivatedRoute} from "@angular/router";
import {TestService} from "../../../service/test.service";
import {takeUntil} from "rxjs";
import {Test} from "../../../entity/test";

/**
 * 用户执行测试用例组件
 */
@Component({
  selector: 'app-test-item',
  templateUrl: './test-item.component.html',
  styleUrls: ['./test-item.component.css']
})
export class TestItemComponent extends BaseComponent implements OnInit{
  test: Test;

  constructor(private route: ActivatedRoute,
              private testService: TestService) {
    super();
  }

  ngOnInit(): void {
    const testId = +this.route.snapshot.paramMap.get('id');

    /*获取需要执行测试的测试用例小项*/
    this.testService.getTestById(testId).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(data => {
        this.test = data;
      })
  }

}
