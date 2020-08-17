import { Injectable } from '@angular/core';
import { IAuthorizationContext } from '../models/iauthorization-context';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationContextService implements IAuthorizationContext {
  public permissions: string[] = [];
  private _isAuthenticated: boolean;
  constructor() {
    this._isAuthenticated = false;
  }
  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  public removePermission(permissions: string | string[]): void {
    this.permissions = this.permissions.filter((c: string): boolean => !permissions.includes(c));
  }
  public addPermission(permissions: string | string[]): void {
    if (typeof permissions === 'string') {
      if (!this.permissions.includes(permissions)) {
        this.permissions.push(permissions);
        this._isAuthenticated = true;
      }

      return;
    }
    const uniquePermissions: Set<string> = new Set(permissions);
    this.permissions.push(...uniquePermissions);
    this._isAuthenticated = true;
  }
}
