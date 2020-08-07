import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxFeatureFlagsModule, NgxFeatureFlagsService } from 'ngx-feature-flags';
import { FeatureFlagTestingService, FEATURE_CONFIG } from './feature-flag-testing.service';

@NgModule({
  declarations: [],
  imports: [
    NgxFeatureFlagsModule
  ],
  exports: [
    NgxFeatureFlagsModule
  ],
  providers: [
    {provide: NgxFeatureFlagsService, useClass: FeatureFlagTestingService},
    {provide: FEATURE_CONFIG, useValue: new Map<string, boolean>()}
  ]
})
export class NgxFeatureFlagsTestingModule {
  /**
   * This method offer the ability to initialize the module with multiple feature flags
   *
   * @static
   * @param {Map<string, boolean>} featureFlags defined feature flags
   * @return {*}  {ModuleWithProviders<NgxFeatureFlagsTestingModule>}
   * @memberof NgxFeatureFlagsTestingModule
   */
  public static withFeatureFlags(featureFlags: Map<string, boolean>): ModuleWithProviders<NgxFeatureFlagsTestingModule>{
    return {
      ngModule: NgxFeatureFlagsTestingModule,
      providers: [ {provide: FEATURE_CONFIG, useValue: featureFlags} ]
    };
  }

  /**
   * This method offer the ability to initialize the module with a single feature flag
   *
   * @static
   * @param {string} featureName the name of the feature flag
   * @param {boolean} enabled the state of the feature flag
   * @return {*}  {ModuleWithProviders<NgxFeatureFlagsTestingModule>}
   * @memberof NgxFeatureFlagsTestingModule
   */
  public static withFeatureFlag(featureName: string, enabled: boolean): ModuleWithProviders<NgxFeatureFlagsTestingModule>{
    return {
      ngModule: NgxFeatureFlagsTestingModule,
      providers: [ {provide: FEATURE_CONFIG, useValue: new Map<string, boolean>([[featureName, enabled]])} ]
    };
  }
}
