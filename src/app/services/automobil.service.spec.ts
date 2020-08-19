import { TestBed } from '@angular/core/testing';

import { AutomobilService } from './automobil.service';

describe('AutomobilService', () => {
  let service: AutomobilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomobilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
