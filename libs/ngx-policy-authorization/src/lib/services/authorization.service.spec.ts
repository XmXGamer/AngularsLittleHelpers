import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { IAuthorizationContext } from '../models/iauthorization-context';
import { AuthorizationService } from './authorization.service';
import { AuthorizationConfigurationService } from './authorization-configuration.service';
import { PolicyNotExistStrategy } from '../enums/policy-not-exist-strategy.enum';
import { InvalidOperationError } from 'common-errors';
import { AuthorizationPolicy } from '../models/authorization-policy';
import { AuthorizationContextService } from './authorization-context.service';

describe('AuthorizationService', () => {
  let spectator: SpectatorService<AuthorizationService>;
  const createService = createServiceFactory({
    service: AuthorizationService,
    mocks: [AuthorizationConfigurationService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('addPermission', () => {
    it('should emit contextChange event', (done) => {
      spectator.service.contextChange$.subscribe((context) => {
        expect(context).toBeTruthy();
        done();
      });
      spectator.service.addPermission('testPermission');
    });

    it('should contain new permission in emitted context', (done) => {
      spectator.service.contextChange$.subscribe((context: IAuthorizationContext) => {
        expect(context.permissions).toContain('testPermission');
        done();
      });
      spectator.service.addPermission('testPermission');
    });

    it('should be authenticated in emitted context', (done) => {
      spectator.service.contextChange$.subscribe((context: IAuthorizationContext) => {
        expect(context).toHaveProperty('isAuthenticated', true);
        done();
      });
      spectator.service.addPermission('testPermission');
    });

    it('should call AuthorizationContext addPermission', (done) => {
      const mockContext = spectator.get(AuthorizationContextService);
      const spy = spyOn(mockContext, 'addPermission');
      spectator.service.contextChange$.subscribe((context: IAuthorizationContext) => {
        expect(context).toBe(mockContext);
        done();
      });
      spectator.service.addPermission('testPermission');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('removePermission', () => {
    it('should emit contextChange event', (done) => {
      spectator.service.contextChange$.subscribe((context) => {
        expect(context).toBeTruthy();
        done();
      });
      spectator.service.removePermission('testPermission');
    });

    it('should not contain the removed permission in emitted context', (done) => {
      spectator.service.addPermission('testPermission');
      spectator.service.contextChange$.subscribe((context: IAuthorizationContext) => {
        expect(context.permissions).not.toContain('testPermission');
        done();
      });
      spectator.service.removePermission('testPermission');
    });

    it('should be authenticated in emitted context', (done) => {
      spectator.service.addPermission('testPermission');
      spectator.service.contextChange$.subscribe((context: IAuthorizationContext) => {
        expect(context).toHaveProperty('isAuthenticated', true);
        done();
      });
      spectator.service.removePermission('testPermission');
    });
  });

  describe('authorize', () => {
    it('should throw InvalidOperationError when policy not found and policyNotExistStrategy is ThrowError', () => {
      const configMock = spectator.get(AuthorizationConfigurationService);
      configMock.policyNotExistStrategy = PolicyNotExistStrategy.ThrowError;
      configMock.getPolicy.and.returnValue(undefined);
      const authAction = () => spectator.service.authorize('not exist');
      expect(authAction).toThrowError(InvalidOperationError);
    });
    it('should return false when policy not found and policyNotExistStrategy is AlwaysFalse', () => {
      const configMock = spectator.get(AuthorizationConfigurationService);
      configMock.policyNotExistStrategy = PolicyNotExistStrategy.AlwaysFalse;
      configMock.getPolicy.and.returnValue(undefined);
      const result = spectator.service.authorize('not exist');
      expect(result).toBeFalse();
    });
    it('should return true when policy not found and policyNotExistStrategy is AlwaysTrue', () => {
      const configMock = spectator.get(AuthorizationConfigurationService);
      configMock.policyNotExistStrategy = PolicyNotExistStrategy.AlwaysTrue;
      configMock.getPolicy.and.returnValue(undefined);
      const result = spectator.service.authorize('not exist');
      expect(result).toBeTrue();
    });
    it('should use defaultPolicy when policy not found and policyNotExistStrategy is UseDefault', () => {
      const configMock = spectator.get(AuthorizationConfigurationService);
      configMock.policyNotExistStrategy = PolicyNotExistStrategy.UseDefault;
      configMock.getPolicy.and.returnValue(undefined);
      configMock.defaultPolicy = new AuthorizationPolicy([]);
      const spy = spyOn(configMock.defaultPolicy, 'authorize').and.returnValue(true);
      spectator.service.authorize('not exist');
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should use defaultPolicy when policy not found and policyNotExistStrategy is UseDefault', () => {
      const configMock = spectator.get(AuthorizationConfigurationService);
      configMock.defaultPolicy = new AuthorizationPolicy([]);
      const spy = spyOn(configMock.defaultPolicy, 'authorize').and.returnValue(true);
      spectator.service.authorize(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should call "getPolicy" when policyName is not undefined', () => {
      const configMock = spectator.get(AuthorizationConfigurationService);
      const spy = configMock.getPolicy.and.returnValue(new AuthorizationPolicy([{ handle: () => true }]));
      spectator.service.authorize('policy');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
