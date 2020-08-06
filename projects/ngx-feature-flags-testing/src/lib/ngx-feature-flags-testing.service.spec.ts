import { TestBed } from '@angular/core/testing';

import { NgxFeatureFlagsTestingService } from './ngx-feature-flags-testing.service';

describe('NgxFeatureFlagsTestingService', () => {
  let service: NgxFeatureFlagsTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFeatureFlagsTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
