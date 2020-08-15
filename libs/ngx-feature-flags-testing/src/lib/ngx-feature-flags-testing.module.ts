import { NgModule } from '@angular/core';
import {
  NgxFeatureFlagsModule,
  NgxFeatureFlagsService,
} from 'ngx-feature-flags';

/**
 * The NgxFeatureFlagsTestingModule provides the {NgxFeatureFlagsModule} as well as a
 * {NgxFeatureFlagsService} configured to return feature flags specific for the
 * test environment.
 *
 * @export
 */
@NgModule({
  imports: [NgxFeatureFlagsModule],
  providers: [
    {
      provide: NgxFeatureFlagsService,
      // tslint:disable-next-line: typedef
      useValue: new NgxFeatureFlagsService(() =>
        Promise.resolve(new Map<string, boolean>())
      ),
    },
  ],
  exports: [NgxFeatureFlagsModule],
})
export class NgxFeatureFlagsTestingModule {
  private featureFlagConfig: Map<string, boolean> = new Map<string, boolean>();
  /**
   * This method offer the ability to initialize the module with multiple feature flags
   *
   * @static
   * @param {Map<string, boolean>} featureFlags defined feature flags
   * @return {*}  {ModuleWithProviders<NgxFeatureFlagsTestingModule>}
   * @memberof NgxFeatureFlagsTestingModule
   */
  public static withFeatureFlags(
    featureFlags: Map<string, boolean>
  ): NgxFeatureFlagsTestingModule {
    const testingModule: NgxFeatureFlagsTestingModule = new NgxFeatureFlagsTestingModule();
    testingModule.featureFlagConfig = featureFlags;

    return testingModule;
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
  public static withFeatureFlag(
    featureName: string,
    enabled: boolean
  ): NgxFeatureFlagsTestingModule {
    const flags: Map<string, boolean> = new Map();
    flags.set(featureName, enabled);

    return this.withFeatureFlags(flags);
  }
  // tslint:disable-next-line: typedef
  public get providers() {
    const featureFlagService: NgxFeatureFlagsService = new NgxFeatureFlagsService(
      this.featureFlagConfigPromise
    );
    // tslint:disable-next-line: no-string-literal
    featureFlagService['featureFlags'] = this.featureFlagConfig;

    return [
      {
        provide: NgxFeatureFlagsService,
        useValue: featureFlagService,
      },
    ];
  }
  // tslint:disable-next-line: typedef
  public get ngModule() {
    return NgxFeatureFlagsTestingModule;
  }
  private readonly featureFlagConfigPromise = (): Promise<
    Map<string, boolean>
  > => Promise.resolve(this.featureFlagConfig);
}
