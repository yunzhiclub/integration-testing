import {NgModule} from '@angular/core';
import {AuthorityDirective} from './authority.directive';
import { HasAuthorityPipe } from './has-authority.pipe';

/**
 * 基于角色的权限的模块
 */
@NgModule({
  declarations: [
    AuthorityDirective,
    HasAuthorityPipe
  ],
  exports: [
    AuthorityDirective
  ]
})
export class AuthorityModule {
}
