import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../../service/user.service";

@Pipe({
  name: 'hasAuthority'
})
export class HasAuthorityPipe implements PipeTransform, OnDestroy {
  private ngDestroy$ = new Subject<void>();
  private hasAuthority = false;
  constructor(private userService: UserService) {
  }

  transform(value: string): boolean {
    this.userService.select(UserService.currentUser).pipe(takeUntil(this.ngDestroy$)).subscribe(user => {
      this.hasAuthority = user.role.toUpperCase() === value.toUpperCase();
    });
    return this.hasAuthority;
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

}
