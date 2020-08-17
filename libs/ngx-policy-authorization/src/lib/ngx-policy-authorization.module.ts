import { ModuleWithProviders, NgModule } from '@angular/core';
import { NotImplementedError } from 'common-errors';
import { AuthorizeDirective } from './authorize.directive';
import { AuthorizationConfigurationService } from './services/authorization-configuration.service';

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
  providers: [],
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
    policies: (c: AuthorizationConfigurationService) => void
  ): ModuleWithProviders<NgxPolicyAuthorizationModule> {
    throw new NotImplementedError('');
  }
}
