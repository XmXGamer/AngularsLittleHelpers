import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { AuthorizationPolicyBuilder } from './authorization-policy-builder';
import { PermissionChangedEvent } from './permission-changed-event';
import { PermissionChangeType } from './permission-change-type.enum';

describe('AuthorizationService', () => {
  let service: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('if the policy not exist', () => {
    it('should throw a error', () => {
      expect(() => service.authorize('policy')).toThrowError();
    });
  });
  describe('if new permission is added', () => {
    it('should stream a permission change event', (done) => {
      service.permissionChange$.subscribe(c => {expect(c).toBeInstanceOf(PermissionChangedEvent); done();});
      service.addPermission('permission');
    })

    it('should stream a permission change event with type add', (done) => {
      service.permissionChange$.subscribe(c => {expect(c.type).toBe(PermissionChangeType.Add); done();});
      service.addPermission('permission');
    })

    it('should stream a permission change event with the new permission', (done) => {
      service.permissionChange$.subscribe(c => {expect(c.permissions).toContain('permission'); done();});
      service.addPermission('permission');
    })
  });

  describe('if permission is removed', () => {
    beforeEach(() => {
      service.addPermission('permission');
    })
    it('should stream a permission change event', (done) => {
      service.permissionChange$.subscribe(c => {expect(c).toBeInstanceOf(PermissionChangedEvent); done();});
      service.removePermission('permission');
    })

    it('should stream a permission change event with type add', (done) => {
      service.permissionChange$.subscribe(c => {expect(c.type).toBe(PermissionChangeType.Remove); done();});
      service.removePermission('permission');
    })

    it('should stream a permission change event with the new permission', (done) => {
      service.permissionChange$.subscribe(c => {expect(c.permissions).not.toContain('permission'); done();});
      service.removePermission('permission');
    })
  });

  describe('if policy is satisfies with single requirement', () => {

    it('should return true with a static value', () => {
      service.addPolicy('policy', (c: AuthorizationPolicyBuilder) => c.staticValue(true));
      const authResult = service.authorize('policy');
      expect(authResult).toBeTrue();
    })

    it('should return true with the permission', () => {
      service.addPermission('permission');
      service.addPolicy('policy', (c: AuthorizationPolicyBuilder) => c.hasPermission('permission'));
      const authResult = service.authorize('policy');
      expect(authResult).toBeTrue();
    })
  });

  describe('if policy is not satisfies with single requirement', () => {

    it('should return false with a static value false', () => {
      service.addPolicy('policy', (c: AuthorizationPolicyBuilder) => c.staticValue(false));
      const authResult = service.authorize('policy');
      expect(authResult).toBeFalse();
    })

    it('should return false without the permission', () => {
      service.addPolicy('policy', (c: AuthorizationPolicyBuilder) => c.hasPermission('permission'));
      const authResult = service.authorize('policy');
      expect(authResult).toBeFalse();
    })
  });

  describe('if policy is statisfy with multiple requirements', () => {
    it('should return true with the permission and a static value', () => {
      service.addPermission('permission');
      service.addPolicy('policy', (c: AuthorizationPolicyBuilder) => c.hasPermission('permission').staticValue(true));
      const authResult = service.authorize('policy');
      expect(authResult).toBeTrue();
    })
    it('should return true with the permission and a static value in reverted order', () => {
      service.addPermission('permission');
      service.addPolicy('policy', (c: AuthorizationPolicyBuilder) => c.staticValue(true).hasPermission('permission'));
      const authResult = service.authorize('policy');
      expect(authResult).toBeTrue();
    })
  });
});
