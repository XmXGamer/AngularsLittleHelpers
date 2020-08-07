import { TestBed } from '@angular/core/testing';

import { FeatureFlagTestingService } from './feature-flag-testing.service';

describe('FeatureFlagTestingService', () => {
  let service: FeatureFlagTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureFlagTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
