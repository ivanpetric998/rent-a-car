import { TestBed } from '@angular/core/testing';

import { GorivoService } from './gorivo.service';

describe('GorivoService', () => {
  let service: GorivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GorivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
