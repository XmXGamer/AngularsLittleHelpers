import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthorizationContext } from './models/authorization-context';
import { AuthorizationOptions } from './models/authorization-options';
import { AuthorizationPolicy } from './models/authorization-policy';
import { AuthorizationPolicyBuilder } from './models/authorization-policy-builder';
import { PermissionChangeType } from './permission-change-type.enum';
import { PermissionChangedEvent } from './permission-changed-event';
/**
 * Represents the service to authorize the current context to have specific permissions or policies to be satisfied
 *
 * @export
 * @class AuthorizationService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private readonly permissons: Set<string>;
  private readonly permissionChangeSubject: Subject<PermissionChangedEvent>;

  constructor(
    private readonly options: AuthorizationOptions,
    private readonly authorizationContext: AuthorizationContext
  ) {
    this.permissons = new Set<string>();
    this.permissionChangeSubject = new Subject<PermissionChangedEvent>();
  }

  get permissionChange$(): Observable<PermissionChangedEvent> {
    return this.permissionChangeSubject.asObservable();
  }
  public removePermission(arg0: string): void {
    this.permissons.delete(arg0);
    this.permissionChangeSubject.next(
      new PermissionChangedEvent(PermissionChangeType.Remove, Array.from(this.permissons))
    );
  }

  public addPermission(arg0: string): void {
    this.permissons.add(arg0);
    this.permissionChangeSubject.next(
      new PermissionChangedEvent(PermissionChangeType.Add, Array.from(this.permissons))
    );
  }

  public authorize(policyName?: string): boolean {
    if (policyName === undefined) {
      return this.defaultPolicy();
    }
    const policy: AuthorizationPolicy | undefined = this.options.getPolicy(policyName);
    if (policy === undefined) {
      throw new Error(`InvalidOperationException: No policy found with name ${policyName}.`);
    }

    return policy.authorize(this.authorizationContext);
  }
  public defaultPolicy(): boolean {
    if (this.options.defaultPolicy !== undefined) {
      return this.options.defaultPolicy.authorize(this.authorizationContext);
    }

    return this.authorizationContext.isAuthenticated;
  }
}
