import { Injectable } from '@angular/core';
import { AuthorizationPolicyBuilder } from './models/authorization-policy-builder';
import { AuthorizationPolicy } from './models/authorization-policy';
import { Observable, Subject } from 'rxjs';
import { PermissionChangedEvent } from './permission-changed-event';
import { PermissionChangeType } from './permission-change-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private _permissons: Set<string>;
  private _permissionChangeSubject: Subject<PermissionChangedEvent>;
  private _policys: Map<string, AuthorizationPolicy>;

  get permissionChange$(): Observable<PermissionChangedEvent>{
    return this._permissionChangeSubject.asObservable();
  }
  removePermission(arg0: string): void {
    this._permissons.delete(arg0);
    this._permissionChangeSubject.next(new PermissionChangedEvent(PermissionChangeType.Remove, Array.from(this._permissons)));
  }

  addPermission(arg0: string): void {
    this._permissons.add(arg0);
    this._permissionChangeSubject.next(new PermissionChangedEvent(PermissionChangeType.Add, Array.from(this._permissons)));
  }
  addPolicy(arg0: string, arg1: (c: AuthorizationPolicyBuilder) => AuthorizationPolicyBuilder): void {
    const builder = new AuthorizationPolicyBuilder();
    const policy: AuthorizationPolicy = arg1(builder).build();
    this._policys.set(arg0, policy);
  }

  authorize(policyName?: string): boolean {
    const policy = this._policys.get(policyName as string);
    if (!policy){
      throw new Error(`InvalidOperationException: No policy found: ${policyName}.`);
    }
    return policy.authorize(Array.from(this._permissons));
  }

  constructor() {
    this._policys = new Map<string, AuthorizationPolicy>();
    this._permissons = new Set<string>();
    this._permissionChangeSubject = new Subject<PermissionChangedEvent>();
  }
}
