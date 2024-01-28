import {Component, OnInit} from '@angular/core';
import {EditorService} from "../../../service/editor.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {Attachment} from "../../../entity/attachment";
import {MyFileService} from "../../../service/my-file.service";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit{
  init: Record<string, any>;
  editParam = {
    selector: 'textarea',
    // plugins是tinymce的各种插件
    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu codesample',
    // 语言包可以使用tinymce提供的网址,但是墙的原因,会连不上,所以还是自行下载,放到assets里面
    language_url: '../../../assets/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    // toolbar定义快捷栏的操作, | 用来分隔显示
    toolbar: 'codesample | bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft'
      + ' aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo '
      + '| link unlink image code | removeformat | h2 h3 h4',
    height: 400,
    // 这里是代码块的一些语言选择,好像暂时还没支持typescript,所以博文都是js格式
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'CSS', value: 'css' },
      { text: 'Java', value: 'java' }
    ]
  };
  ngOnInit(): void {
    this.init = {
      base_url: '/tinymce',
      suffix: '.min',
      height: '500px',
      contextmenu: true,
      relative_urls: false,
      menubar: false,
      language: 'zh_CN',
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        `insertdatetime media table paste code help wordcount ${EditorService.keys.yzImageTip}`
      ],
      // 文件上传拦截器
      // images_upload_handler: (blobInfo: any, success: any, failure: any): void => {
      //   this.attachmentService.upload(blobInfo.blob())
      //     .subscribe((response: HttpEvent<Attachment>) => {
      //       if (response.type === HttpEventType.Response) {
      //         const attachment = response.body as Attachment
      //         success(MyFileService.getFullPath(attachment.file));
      //       }
      //     }, (response: HttpErrorResponse) => {
      //       failure('上传图片异常: ' + response.error);
      //     });
      // },
      toolbar:
        `undo redo | formatselect | bold italic ${EditorService.keys.yzImageTip} | ` +
        'alignleft aligncenter alignright alignjustify  | ' +
        'bullist numlist outdent indent | removeformat | help',
      // 允许拖拽图片
      paste_data_images: true,
    };
  }


}
