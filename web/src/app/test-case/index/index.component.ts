import { Component } from '@angular/core';

/**
 * 测试用例的大项Index组件
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  
  isCollapsed = true;
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
