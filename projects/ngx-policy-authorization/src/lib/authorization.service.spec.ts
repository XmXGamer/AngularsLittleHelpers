import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AuthorizationService } from './authorization.service';
import { AuthorizationPolicyBuilder } from './models/authorization-policy-builder';
import { PermissionChangedEvent } from './permission-changed-event';
import { PermissionChangeType } from './permission-change-type.enum';

describe('AuthorizationService', () => {
  let spectator: SpectatorService<AuthorizationService>;
  const createService = createServiceFactory(AuthorizationService);
  let service: AuthorizationService;

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged in', () => {
    expect(service).toHaveProperty('isAuthenticated', false);
  });
});
