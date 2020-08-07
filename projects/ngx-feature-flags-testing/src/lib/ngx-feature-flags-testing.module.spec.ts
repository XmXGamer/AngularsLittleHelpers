import { NgxFeatureFlagsTestingModule } from './ngx-feature-flags-testing.module';

import { async, TestBed } from '@angular/core/testing';
import { NgxFeatureFlagsService } from 'ngx-feature-flags';

describe('NgxFeatureFlagTestingModule', () => {

  describe('if no feature flags are set', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [  ],
        imports: [NgxFeatureFlagsTestingModule]
      });
    }));


    it('should can create feature flag service', () => {
      const service = TestBed.inject(NgxFeatureFlagsService);
      expect(service).toBeTruthy();
    });
  });

  describe('if feature flag is set over a map', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [  ],
        imports: [NgxFeatureFlagsTestingModule.withFeatureFlags(new Map([['featureA', true]]))]
      });
    }));


    it('should can create feature flag service', () => {
      const service = TestBed.inject(NgxFeatureFlagsService);
      expect(service).toBeTruthy();
    });

    describe('the service', () => {
      it('should return true on featureOn with the right feature', () => {
        const service = TestBed.inject(NgxFeatureFlagsService);
        expect(service.featureOn('featureA')).toBeTrue();
      });
      it('should return false on featureOn with the false feature', () => {
        const service = TestBed.inject(NgxFeatureFlagsService);
        expect(service.featureOn('featureB')).toBeFalse();
      });
      it('should return true on featureOff with the false feature', () => {
        const service = TestBed.inject(NgxFeatureFlagsService);
        expect(service.featureOff('featureB')).toBeTrue();
      });
      it('should return false on featureOff with the right feature', () => {
        const service = TestBed.inject(NgxFeatureFlagsService);
        expect(service.featureOff('featureA')).toBeFalse();
      });
    });
  });

  describe('if no feature flags is set over feature name and value', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [  ],
        imports: [NgxFeatureFlagsTestingModule.withFeatureFlag('featureA', true)]
      });
    }));


    it('should can create feature flag service', () => {
      const service = TestBed.inject(NgxFeatureFlagsService);
      expect(service).toBeTruthy();
    });
  });

});
