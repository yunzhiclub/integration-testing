import { HasAuthorityPipe } from './has-authority.pipe';
import {UserService} from "../../service/user.service";
import {User} from "../../entity/user";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HasAuthorityPipe', () => {
  let userService: UserService;
  let pipe:HasAuthorityPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [[{provide: UserService, useClass: UserService}]
      ]
    });

    userService = TestBed.inject(UserService);
    const state = userService.getState();
    state.currentUser = {role: 'role_admin'} as User;
    userService.next(state);
    pipe = new HasAuthorityPipe(userService);
  })

  it('有权限', () => {
    expect(pipe.transform('role_admin')).toBeTruthy();
  });

  it('没有权限 ', () => {
    expect(pipe.transform('role')).toBeFalse();
  });
})
