import { AuthorizationPolicyBuilder } from './authorization-policy-builder';

describe('AuthorizationPolicyBuilder', () => {
  it('should create an instance', () => {
    expect(new AuthorizationPolicyBuilder()).toBeTruthy();
  });
});
