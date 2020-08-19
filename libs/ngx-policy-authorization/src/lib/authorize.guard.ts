import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeRouteConfiguration } from './models/authorize-route-configuration';
import { AuthorizationService } from './services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly _authorizationService: AuthorizationService, private readonly _router: Router) {}
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.authorize(next);
  }
  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.authorize(next);
  }
  public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const authorizeResult: boolean | UrlTree = this.authorize(route);
    if (authorizeResult instanceof UrlTree) {
      return false;
    }

    return authorizeResult;
  }

  private authorize(route: ActivatedRouteSnapshot | Route): boolean | UrlTree {
    const configuration: AuthorizeRouteConfiguration = <AuthorizeRouteConfiguration>route.data?.authorize;
    const isAuthorize: boolean = this._authorizationService.authorize(configuration.policy);

    if (isAuthorize) {
      return true;
    }

    if (configuration.redirectUrl !== undefined) {
      return this._router.parseUrl(configuration.redirectUrl);
    }

    return false;
  }
}
