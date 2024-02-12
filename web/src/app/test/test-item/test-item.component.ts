import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../share/base-component";

/**
 * 用户执行测试用例组件
 */
@Component({
  selector: 'app-test-item',
  templateUrl: './test-item.component.html',
  styleUrls: ['./test-item.component.css']
})
export class TestItemComponent extends BaseComponent implements OnInit{

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
