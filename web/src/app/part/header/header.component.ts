import {Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * 头部组件
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  environment = environment;


  constructor() {
  }

  ngOnInit(): void {
  }
}
