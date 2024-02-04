import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: number): SafeHtml {
    let textStyle = '';
    let text = '';

    switch (value) {
      case 0:
        textStyle = 'badge badge-danger  mt-1';
        text = "待发布";
        break;
      case 1:
        textStyle = 'badge badge-primary mt-1';
        text = "待开始";
        break;
      case 2:
        textStyle = 'badge badge-info  mt-1';
        text = "部分完成";
        break;
      case 3:
        textStyle = 'badge badge-success mt-1';
        text = "已完成";
        break;
    }

    const html = `<span class="${textStyle}">${text}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
