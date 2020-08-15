import { ExcludePermissionRequirement } from '../requirements/exclude-permission-requirement';
import { IRequirement } from '../requirements/i-requirement';
import { PermissionRequirement } from '../requirements/permission-requirement';
import { StaticValueRequirement } from '../requirements/static-value-requirement';
import { AuthorizationPolicy } from './authorization-policy';
/**
 * Offers a simple way to build policies
 *
 * @export
 * @class AuthorizationPolicyBuilder
 */
export class AuthorizationPolicyBuilder {
  private readonly requirements: IRequirement[] = [];

  public build(): AuthorizationPolicy {
    return new AuthorizationPolicy(this.requirements);
  }
  public staticValue(val: boolean): AuthorizationPolicyBuilder {
    this.requirements.push(new StaticValueRequirement(val));

    return this;
  }

  public hasPermission(arg0: string): AuthorizationPolicyBuilder {
    this.requirements.push(new PermissionRequirement(arg0));

    return this;
  }

  public excludePermission(arg0: string): AuthorizationPolicyBuilder {
    this.requirements.push(new ExcludePermissionRequirement(arg0));

    return this;
  }

  public addRequirement(arg0: IRequirement): AuthorizationPolicyBuilder {
    this.requirements.push(arg0);

    return this;
  }

}
