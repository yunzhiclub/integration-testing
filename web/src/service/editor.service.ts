import {Injectable} from '@angular/core';
import tinymce, {Editor} from 'tinymce';

import {EditorComponent} from '../app/editor/editor.component';
import {CommonService} from "./common-service";


/**
 * 富文本编辑器服务
 */
@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private editorMap = new Map<Editor, EditorComponent>();
  private registered = false;
  public static keys = {
    yzImageTip: 'yzImageTip'
  }

  constructor(private commonService: CommonService) {
    this.registerPlugins();
  }

  /**
   * 注册插件
   */
  registerPlugins(): void {
    if (!this.registered) {
      this.registered = true;
      const self = this;
      tinymce.PluginManager.add('yzImageTip', function (editor) {
        editor.ui.registry.addButton('yzImageTip', {
          icon: 'image',
          onAction: () => {
            const component = self.editorMap.get(editor);
            // todo: 动态的创建副件上传组件，最后将得到的附件插入到当前内容中
            self.commonService.info(() => {
              },
              '您可以通过鼠标拖拽或ctrl + v 将任意图片粘贴到编辑器中',
              '操作指南')
          }
        })
      });
    }
  }

  addComponentAddEditor(editor: Editor, editorComponent: EditorComponent) {
    this.editorMap.set(editor, editorComponent);
  }

  deleteComponentAddEditor(editor: Editor) {
    this.editorMap.delete(editor);
  }
}
