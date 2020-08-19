import { TestBed } from '@angular/core/testing';

import { SlajderService } from './slajder.service';

describe('SlajderService', () => {
  let service: SlajderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlajderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
