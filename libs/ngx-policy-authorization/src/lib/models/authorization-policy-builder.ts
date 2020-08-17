import { AuthorizationPolicy } from './authorization-policy';
import { IRequirement } from './i-requirement';
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

  public addRequirement(arg0: IRequirement): AuthorizationPolicyBuilder {
    this.requirements.push(arg0);

    return this;
  }
}
