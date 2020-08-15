import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { AuthorizeDirective } from './authorize.directive';
import { AuthorizationOptions } from './models/authorization-options';

/**
 * The main entry point of this project
 * It offers the user the complete functionality of this project after import
 *
 * @export
 * @class NgxPolicyAuthorizationModule
 */
// tslint:disable-next-line: export-name
@NgModule({
  declarations: [AuthorizeDirective],
  imports: [],
  providers: [AuthorizationOptions],
  exports: [AuthorizeDirective],
})
// tslint:disable-next-line: no-unnecessary-class
export class NgxPolicyAuthorizationModule {
  /**
   * Offers the possibility to configure policies on import
   *
   * @static
   * @param {(c: AuthorizationService)=> void} policies
   * @return {*}  {ModuleWithProviders<NgxPolicyAuthorizationModule>}
   * @memberof NgxPolicyAuthorizationModule
   */
  public static withPolicies(
    policies: (c: AuthorizationOptions) => void
  ): ModuleWithProviders<NgxPolicyAuthorizationModule> {
    const options: AuthorizationOptions = new AuthorizationOptions();
    policies(options);

    return {
      ngModule: NgxPolicyAuthorizationModule,
      providers: [
        {
          provide: AuthorizationOptions,
          useValue: options,
        },
      ],
    };
  }
}
