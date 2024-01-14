import {Pipe, PipeTransform} from '@angular/core';

/**
 * 角色管道
 */
@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: string): string {
    let result: string = '';
    switch (value) {
      case 'role_admin':
        result = "管理员";
        break;
      case 'role_user':
        result = "普通成员";
        break;
    }
    return result;
  }
}
