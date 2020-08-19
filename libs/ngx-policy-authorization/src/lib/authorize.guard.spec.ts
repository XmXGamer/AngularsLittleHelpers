import { AuthorizeGuard } from './authorize.guard';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { AuthorizationService } from './services/authorization.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Data, UrlTree } from '@angular/router';

describe('AuthorizeGuard', () => {
  let spectator: SpectatorService<AuthorizeGuard>;
  const createService = createServiceFactory({
    service: AuthorizeGuard,
    mocks: [AuthorizationService, Router, ActivatedRouteSnapshot],
  });

  beforeEach(() => (spectator = createService()));

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('when authorizationservice returns false and no redirect url is set', () => {
    let activated: ActivatedRouteSnapshot;
    const route: Route = {
      data: {
        authorize: {
          policy: 'test',
        },
      },
    };
    beforeEach(() => {
      const authorizationservice = spectator.get(AuthorizationService);
      authorizationservice.authorize.and.returnValue(false);
      activated = spectator.get(ActivatedRouteSnapshot);
      activated.data = route.data as Data;
    });
    it('canActivate returns false', () => {
      const result = spectator.service.canActivate(activated, {} as RouterStateSnapshot);
      expect(result).toBeFalse();
    });
    it('canActivateChildren returns false', () => {
      const result = spectator.service.canActivateChild(activated, {} as RouterStateSnapshot);
      expect(result).toBeFalse();
    });
    it('canActivate returns false', () => {
      const result = spectator.service.canLoad(route, []);
      expect(result).toBeFalse();
    });
  });
  describe('when authorizationservice returns false and redirect url is set', () => {
    let activated: ActivatedRouteSnapshot;
    const route: Route = {
      data: {
        authorize: {
          policy: 'test',
          redirectUrl: 'url',
        },
      },
    };
    const tree = new UrlTree();
    beforeEach(() => {
      const authorizationservice = spectator.get(AuthorizationService);
      authorizationservice.authorize.and.returnValue(false);
      activated = spectator.get(ActivatedRouteSnapshot);
      activated.data = route.data as Data;
      const router = spectator.get(Router);
      router.parseUrl.and.returnValue(tree);
    });
    it('canActivate returns an UrlTree', () => {
      const result = spectator.service.canActivate(activated, {} as RouterStateSnapshot);
      expect(result).toBeInstanceOf(UrlTree);
      expect(result).toBe(tree);
    });
    it('canActivateChildren returns an UrlTree', () => {
      const result = spectator.service.canActivateChild(activated, {} as RouterStateSnapshot);
      expect(result).toBeInstanceOf(UrlTree);
      expect(result).toBe(tree);
    });
    it('canActivate returns false', () => {
      const result = spectator.service.canLoad(route, []);
      expect(result).toBeFalse();
    });
  });
  describe('when authorizationservice returns true', () => {
    let activated: ActivatedRouteSnapshot;
    const route: Route = {
      data: {
        authorize: {
          policy: 'test',
          redirectUrl: 'url',
        },
      },
    };
    const tree = new UrlTree();
    beforeEach(() => {
      const authorizationservice = spectator.get(AuthorizationService);
      authorizationservice.authorize.and.returnValue(true);
      activated = spectator.get(ActivatedRouteSnapshot);
      activated.data = route.data as Data;
    });
    it('canActivate returns true', () => {
      const result = spectator.service.canActivate(activated, {} as RouterStateSnapshot);
      expect(result).toBeTrue();
    });
    it('canActivateChildren returns true', () => {
      const result = spectator.service.canActivateChild(activated, {} as RouterStateSnapshot);
      expect(result).toBeTrue();
    });
    it('canActivate returns true', () => {
      const result = spectator.service.canLoad(route, []);
      expect(result).toBeTrue();
    });
  });
});
