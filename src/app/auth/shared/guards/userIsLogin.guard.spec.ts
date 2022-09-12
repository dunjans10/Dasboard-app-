import { TestBed } from '@angular/core/testing';
import { UserIsLogin } from './userIsLogin.guard';



describe('IsLoginGuard', () => {
  let guard: UserIsLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserIsLogin);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
