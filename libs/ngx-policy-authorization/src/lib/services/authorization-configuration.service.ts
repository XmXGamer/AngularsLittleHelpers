import { Injectable } from '@angular/core';
import { InvalidOperationError, NotImplementedError } from 'common-errors';
import { PolicyNotExistStrategy } from '../enums/policy-not-exist-strategy.enum';
import { AuthorizationPolicy } from '../models/authorization-policy';
import { AuthorizationPolicyBuilder } from '../models/authorization-policy-builder';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationConfigurationService {
  public policyNotExistStrategy: PolicyNotExistStrategy = PolicyNotExistStrategy.ThrowError;
  public defaultPolicy?: AuthorizationPolicy;
  private readonly _polices: Map<string, AuthorizationPolicy>;
  constructor() {
    this._polices = new Map();
  }
  public addPolicy(policyName: string, builderAction: (builder: AuthorizationPolicyBuilder) => void): void {
    if (this._polices.has(policyName)) {
      throw new InvalidOperationError(`Policy with the name "${policyName}" already exists.`);
    }
    const builder: AuthorizationPolicyBuilder = new AuthorizationPolicyBuilder();
    builderAction(builder);
    const policy: AuthorizationPolicy = builder.build();
    this._polices.set(policyName, policy);
  }

  public getPolicy(policyName: string): AuthorizationPolicy | undefined {
    return this._polices.get(policyName);
  }
}
