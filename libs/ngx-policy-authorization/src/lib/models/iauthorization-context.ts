export interface IAuthorizationContext {
  readonly permissions: ReadonlyArray<string>;
  readonly isAuthenticated: boolean;
}
