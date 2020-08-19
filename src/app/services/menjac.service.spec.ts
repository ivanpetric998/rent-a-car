import { TestBed } from '@angular/core/testing';

import { MenjacService } from './menjac.service';

describe('MenjacService', () => {
  let service: MenjacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenjacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
