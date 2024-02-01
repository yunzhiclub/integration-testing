import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";
import {Page} from "@yunzhi/ng-common";
import {environment} from "../../../environments/environment";
import {takeUntil} from "rxjs";
import {TestCaseService} from "../../../service/test-case.service";
import {CommonService} from "../../../service/common-service";
import {TestCase} from "../../../entity/test-case";
import {TestItemService} from "../../../service/test-item.service";
import {TestItem} from "../../../entity/test-item";
import {FormControl} from "@angular/forms";
import {Project} from "../../../entity/project";

/**
 * 测试用例的大项Index组件
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit{
  isCollapsed = true;
  pageData: Page<TestCase> = new Page<TestCase>();
  project = new FormControl<Project>(null);

  param = {
    page: 0,
    size: environment.size,
    projectId: 0
  };

  constructor(private testCaseService: TestCaseService,
              private commonService: CommonService,
              private testItemService: TestItemService) {
    super();
  }

  ngOnInit(): void {
    this.testCaseService.select(TestCaseService.pageData).pipe(takeUntil(this.ngOnDestroy$))
      .subscribe({
        next: (data) => {
          this.pageData = data;
        }
      });

    this.reload();
  }

  reload(): void {
    this.testCaseService.pageAction(this.param);
  }

  onChangeSize(size: number) {
    this.param.size = size;
    this.reload();
  }

  onChangePage(page: number) {
    this.param.page = page;
    this.reload();
  }

  onQuery(): void{
    this.param.projectId = +(this.project.value.id);
    this.reload()
  }

  toggleCollapse(id: number, isShow: boolean | any) {
    if(isShow !== undefined) {
      this.testCaseService.toggleCollapse(id, isShow).pipe(takeUntil(this.ngOnDestroy$)).subscribe();
    }
  }

  delete(name: string, id: number) {
    this.commonService.confirm(() => {
      this.testCaseService.deleteAction(id).subscribe(() => {
        this.commonService.success(() => {
        }, '删除成功');
      }, error => {
        this.commonService.error(() => {
        }, '删除失败' + error)
      });
    }, '是否删除' + name);
  }


  deleteTestItem(testCaseId: number, id: number, name: string) {
    this.commonService.confirm(() => {
      this.testItemService.deleteTestItem(testCaseId, id).subscribe(() => {
        this.commonService.success(() => {
        }, '删除成功');
      }, error => {
        this.commonService.error(() => {
        }, '删除失败' + error)
      });
    }, '是否删除' + name);
  }

  /**
   * 上移动一格
   * @param testItem
   * @param index
   */
  upGo(testItem: TestItem[] | undefined, index: number) {
    if(index!=0){
      testItem[index] = testItem.splice(index-1, 1, testItem[index])[0];
    }else{
      testItem.push(testItem.shift());
    }
  }

  /**
   * 下移动一格
   * @param testItem
   * @param index
   */
  downGo(testItem: TestItem[] | undefined, index: number) {
    if(index!=testItem.length-1){
      testItem[index] = testItem.splice(index+1, 1, testItem[index])[0];
    }else{
      testItem.unshift( testItem.splice(index,1)[0]);
    }
  }
}
