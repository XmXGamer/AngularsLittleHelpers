import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { InvalidOperationError } from 'common-errors';
import { PolicyNotExistStrategy } from '../enums/policy-not-exist-strategy.enum';
import { AuthorizationPolicy } from '../models/authorization-policy';
import { AuthorizationConfigurationService } from './authorization-configuration.service';

describe('AuthorizationConfigurationService', () => {
  let spectator: SpectatorService<AuthorizationConfigurationService>;
  const createService = createServiceFactory(AuthorizationConfigurationService);

  beforeEach(() => (spectator = createService()));

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('default configuration', () => {
    it('should have policyNotExistStrategy to be error', () => {
      expect(spectator.service).toHaveProperty('policyNotExistStrategy', PolicyNotExistStrategy.ThrowError);
    });

    it('should have undefined defaultPolicy', () => {
      expect(spectator.service).toHaveProperty('defaultPolicy', undefined);
    });
  });

  it('should be possible to set policyNotExistStrategy', () => {
    spectator.service.policyNotExistStrategy = PolicyNotExistStrategy.AlwaysFalse;
    expect(spectator.service).toHaveProperty('policyNotExistStrategy', PolicyNotExistStrategy.AlwaysFalse);
  });

  it('should be possible to set defaultPolicy to undefined', () => {
    spectator.service.defaultPolicy = undefined;
    expect(spectator.service).toHaveProperty('defaultPolicy', undefined);
  });

  it('should be possible to set defaultPolicy to specific policy', () => {
    const policy = new AuthorizationPolicy([]);
    spectator.service.defaultPolicy = policy;
    expect(spectator.service).toHaveProperty('defaultPolicy', policy);
  });

  describe('addPolicy', () => {
    it('should be possible to add a policy', () => {
      const policyAction = new AuthorizationPolicy([]);
      spectator.service.addPolicy('policy', (c) => c.addRequirement({ handle: () => true }));
      const result = spectator.service.getPolicy('policy');
      expect(result).toBeTruthy();
    });

    it('should throw InvalidOperationError when policyName exists', () => {
      const policyAction = new AuthorizationPolicy([]);
      spectator.service.addPolicy('policy', (c) => c.addRequirement({ handle: () => true }));
      const action = () => spectator.service.addPolicy('policy', (c) => c.addRequirement({ handle: () => true }));
      expect(action).toThrowError(InvalidOperationError);
    });
  });

  describe('getPolicy', () => {
    it('should return undefined if policy not exists', () => {
      const result = spectator.service.getPolicy('');
      expect(result).toBeUndefined();
    });

    it('should return the existing policy', () => {
      spectator.service.addPolicy('policy', (c) => c.addRequirement({ handle: () => true }));
      const result = spectator.service.getPolicy('policy');
      expect(result).toBeTruthy();
    });
  });
});
