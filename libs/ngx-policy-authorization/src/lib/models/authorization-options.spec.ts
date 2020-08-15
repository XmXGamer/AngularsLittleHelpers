import { AuthorizationOptions } from './authorization-options';
import { AuthorizationPolicy } from './authorization-policy';
import { InvalidOperationError } from 'common-errors';

describe('AuthorizationOptions', () => {
  let options: AuthorizationOptions;
  beforeEach(() => {
    options = new AuthorizationOptions();
  });

  it('should create an instance', () => {
    expect(options).toBeTruthy();
  });

  it('should have "undifined" as default value for default policy', () => {
    expect(options).toHaveProperty('defaultPolicy', undefined);
  });

  it('should have return undefined when the policy not exists', () => {
    const result = options.getPolicy('policy');
    expect(result).toBeUndefined();
  });

  it('should be possible to set the default policy', () => {
    const policy = new AuthorizationPolicy([]);
    options.defaultPolicy = policy;
    expect(options).toHaveProperty('defaultPolicy', policy);
  });

  it('should be possible to add a policy', () => {
    options.addPolicy('test', (c) => c.staticValue(true));
    const result = options.getPolicy('test');
    expect(result).toBeTruthy();
  });

  it('should throw a "InvalidOperationError" when the policyName exists', () => {
    options.addPolicy('policy', (c) => {
      c.staticValue(true);
    });
    const action = () =>
      options.addPolicy('policy', (c) => {
        c.staticValue(true);
      });
    expect(action).toThrowError(InvalidOperationError);
  });
});
