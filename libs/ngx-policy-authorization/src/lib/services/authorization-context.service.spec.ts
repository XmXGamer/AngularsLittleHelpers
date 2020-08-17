import { TestBed } from '@angular/core/testing';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AuthorizationContextService } from './authorization-context.service';

describe('AuthorizationContextService', () => {
  let spectator: SpectatorService<AuthorizationContextService>;
  const createService = createServiceFactory(AuthorizationContextService);

  beforeEach(() => (spectator = createService()));

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('default configuration', () => {
    it('should have isAuthenticated to be false', () => {
      expect(spectator.service).toHaveProperty('isAuthenticated', false);
    });

    it('should have empty array of permissions', () => {
      expect(spectator.service).toHaveProperty('permissions', []);
    });
  });

  describe('addPermission', () => {
    it('should be possible to add a permission', () => {
      spectator.service.addPermission('testPermission');
      const permissions = spectator.service.permissions;
      expect(permissions).toContain('testPermission');
    });

    it('should have isAuthenticated to be true after adding', () => {
      spectator.service.addPermission('testPermission');
      expect(spectator.service).toHaveProperty('isAuthenticated', true);
    });

    it('should be possible to add multiple permissions in one call', () => {
      spectator.service.addPermission([
        'testPermission',
        'testPermission2',
        'testPermission3',
      ]);
      const permissions = spectator.service.permissions;
      expect(permissions).toHaveLength(3);
    });

    it('should only add a permission once', () => {
      spectator.service.addPermission('testPermission');
      spectator.service.addPermission('testPermission');
      const permissions = spectator.service.permissions;
      expect(permissions).toHaveLength(1);
    });

    it('should only add unique permissions in one call', () => {
      spectator.service.addPermission([
        'testPermission',
        'testPermission',
        'testPermission3',
      ]);
      const permissions = spectator.service.permissions;
      expect(permissions).toHaveLength(2);
    });
  });
});
