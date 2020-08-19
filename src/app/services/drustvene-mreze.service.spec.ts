import { TestBed } from '@angular/core/testing';

import { DrustveneMrezeService } from './drustvene-mreze.service';

describe('DrustveneMrezeService', () => {
  let service: DrustveneMrezeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrustveneMrezeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
