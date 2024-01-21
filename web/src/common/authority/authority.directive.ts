import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewChildren, ViewContainerRef} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Subject, takeUntil} from "rxjs";

/**
 * 基于角色的权限的指令
 */
@Directive({
  selector: '[appAuthority]'
})
export class AuthorityDirective implements OnInit, OnDestroy {

  @Input('appAuthority')
  authority: string;

  private ngDestroy$ = new Subject<void>();
  private showing = false;

  constructor(private userService: UserService,
              private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.userService.select(UserService.currentUser).pipe(takeUntil(this.ngDestroy$))
      .subscribe((v) => {
        if (v.role.toUpperCase() === this.authority.toUpperCase()) {
          this.showing = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else if (this.showing) {
          this.showing = false;
          this.viewContainerRef.clear();
        }
      })
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

}
