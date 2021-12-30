import { TestBed } from '@angular/core/testing';

import { UsersGroupService } from './users-group.service';

describe('UsersGroupService', () => {
  let service: UsersGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
