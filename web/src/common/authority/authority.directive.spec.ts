import {AuthorityDirective} from './authority.directive';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {UserService} from "../../service/user.service";
import {User} from "../../entity/user";
import {HttpClientTestingModule} from "@angular/common/http/testing";


@Component({
  template: `
    <div *appAuthority="authority">Visible</div>`
})
class TestComponent {
  authority = 'role_admin';
}

describe('AuthorityDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let userService: UserService;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthorityDirective, TestComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [[{provide: UserService, useClass: UserService}]
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    userService = TestBed.inject(UserService);
    const state = userService.getState();
    state.currentUser = {role: 'role_admin'} as User;
    userService.next(state);
  })

  it('含权限显示', () => {

    component = fixture.componentInstance;
    component.authority = 'role_admin';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.textContent).toContain('Visible');
    });
  });


  it('不含权限显示', () => {
    component = fixture.componentInstance;
    component.authority = 'role';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.textContent).not.toContain('Visible');
    });
  });
});
