import { TestBed } from '@angular/core/testing';

import { IsNotLoginGuard } from './isNot-authenticated.guard';

describe('IsAuthenticatedGuard', () => {
  let guard: IsNotLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNotLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
