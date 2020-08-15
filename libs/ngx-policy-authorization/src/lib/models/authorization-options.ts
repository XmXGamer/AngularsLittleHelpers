import { InvalidOperationError } from 'common-errors';
import { AuthorizationPolicy } from './authorization-policy';
import { AuthorizationPolicyBuilder } from './authorization-policy-builder';
/**
 * Represents the configuration options to import the the module
 *
 * @export
 * @class AuthorizationOptions
 */
export class AuthorizationOptions {
  public defaultPolicy?: AuthorizationPolicy;
  private readonly policies: Map<string, AuthorizationPolicy>;

  constructor() {
    this.policies = new Map<string, AuthorizationPolicy>();
  }

  /**
   * Adds a policy to the configuration
   *
   * @param {string} policyName
   * @param {(c: AuthorizationPolicyBuilder) => void} policy
   * @memberof AuthorizationOptions
   */
  public addPolicy(policyName: string, policy: (c: AuthorizationPolicyBuilder) => void): void {
    if (this.policies.has(policyName)) {
      throw new InvalidOperationError(`There exist already a policy with the name ${policyName}`);
    }
    const builder: AuthorizationPolicyBuilder = new AuthorizationPolicyBuilder();
    policy(builder);
    this.policies.set(policyName, builder.build());
  }
  public getPolicy(policyName: string): AuthorizationPolicy | undefined {
    return this.policies.get(policyName);
  }
}
