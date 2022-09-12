import { TestBed } from '@angular/core/testing';
import { UserIsNotLogin } from './userIsNotLogin.guard';



describe('IsAuthenticatedGuard', () => {
  let guard: UserIsNotLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserIsNotLogin);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
