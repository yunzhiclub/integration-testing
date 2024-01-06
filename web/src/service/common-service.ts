import {Injectable} from "@angular/core";
import {ErrorResponse} from "../entity/error-response";
import swal, {SweetAlertIcon, SweetAlertResult} from 'sweetalert2';

/**
 * 成功，失败，请确认提示框service
 */
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  /*
 * 操作失败提示框
 * @param callback  回调
 * @param description  描述
 * @param title  标题
 * @param response 后台返回的response
 */
  error(callback?: () => void, description: string = '', title: string = '操作失败', response?: ErrorResponse): void {
    if (response) {
      const error = response.error;
      description = (error?.errors && error?.errors?.length > 0) ? error?.errors?.join(";") : error?.message;
    }
    swal.fire({
      titleText: title,
      text: description,
      icon: 'error',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: '确定',
      confirmButtonColor: '#007BFF',
      showCancelButton: false
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }

  /**
   * 操作成功提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   * @param options     选项
   */
  success(callback?: () => void, description: string = '', title: string = '操作成功', option = {confirmButtonText: '确定'}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'success',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: option.confirmButtonText,
      confirmButtonColor: '#007BFF',
      showCancelButton: false
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }

  /**
   * 是否删除提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  confirm(callback?: () => void, description: string = '', title: string = '请确认'): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'question',
      confirmButtonText: '是',
      cancelButtonText: '否',
      showCancelButton: true,
      confirmButtonColor: '#007BFF',
      showCloseButton: true
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }

  /**
   * 友情提示消息框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   * @param options showConfirmButton: 是否显示确认按钮
   */
  info(callback?: () => void, description: string = '', title: string = '友情提示', options = {showConfirmButton: true}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'info',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: '确定',
      confirmButtonColor: '#007BFF',
      showCancelButton: false,
      showConfirmButton: options.showConfirmButton
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }

  /**
   * 是否确认提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  friendlyReminder(callback?: (state?: boolean) => void,
                   title: string = '',
                   description: string = '该操作不可逆，请谨慎操作',
                   cancelButtonText = '取消',
                   confirmButtonText = '确定',
                   options = {icon: 'question' as SweetAlertIcon}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: options.icon,
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText,
      confirmButtonColor: '#007BFF',
      showCancelButton: true,
      cancelButtonText,
      cancelButtonColor: '#6C757D'
    }).then((result: SweetAlertResult) => {
      if (callback) {
        callback(result.isConfirmed);
      }
    });
  }
}
