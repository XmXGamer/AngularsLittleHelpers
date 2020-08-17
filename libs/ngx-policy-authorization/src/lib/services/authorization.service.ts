import { Injectable } from '@angular/core';
import { InvalidOperationError } from 'common-errors';
import { Observable, Subject } from 'rxjs';
import { PolicyNotExistStrategy } from '../enums/policy-not-exist-strategy.enum';
import { AuthorizationPolicy } from '../models/authorization-policy';
import { IAuthorizationContext } from '../models/iauthorization-context';
import { AuthorizationConfigurationService } from './authorization-configuration.service';
import { AuthorizationContextService } from './authorization-context.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public readonly contextChange$: Observable<IAuthorizationContext>;
  private readonly _contextChangeSubject: Subject<IAuthorizationContext>;

  constructor(
    private readonly _authorizationContext: AuthorizationContextService,
    private readonly _authorizationConfiguration: AuthorizationConfigurationService
  ) {
    this._contextChangeSubject = new Subject();
    this.contextChange$ = this._contextChangeSubject.asObservable();
  }
  public removePermission(permissions: string | string[]): void {
    this._authorizationContext.removePermission(permissions);
    this._contextChangeSubject.next(this._authorizationContext);
  }
  public addPermission(permissions: string | string[]): void {
    this._authorizationContext.addPermission(permissions);
    this._contextChangeSubject.next(this._authorizationContext);
  }
  public authorize(policyName: string | undefined): boolean {
    if (policyName === undefined) {
      return this.defaultAuthorize();
    }
    const policy: AuthorizationPolicy | undefined = this._authorizationConfiguration.getPolicy(policyName);
    if (policy === undefined) {
      return this.policyNotExistAuthorize(policyName);
    }

    return policy.authorize(this._authorizationContext);
  }
  private policyNotExistAuthorize(policyName: string): boolean {
    switch (this._authorizationConfiguration.policyNotExistStrategy) {
      case PolicyNotExistStrategy.AlwaysFalse:
        return false;
      case PolicyNotExistStrategy.AlwaysTrue:
        return true;
      case PolicyNotExistStrategy.UseDefault:
        return this.defaultAuthorize();
      case PolicyNotExistStrategy.ThrowError:
      default:
        throw new InvalidOperationError(`The required policy with the name ${policyName} not exist`);
    }
  }
  private defaultAuthorize(): boolean {
    const policy: AuthorizationPolicy | undefined = this._authorizationConfiguration.defaultPolicy;
    if (policy === undefined) {
      throw new InvalidOperationError('The default policy should be used, but is undefined.');
    }

    return policy.authorize(this._authorizationContext);
  }
}
