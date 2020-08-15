import { TestBed } from '@angular/core/testing';
import { NgxPolicyAuthorizationModule } from './ngx-policy-authorization.module';
import { AuthorizationService } from './authorization.service';
import { AuthorizationPolicyBuilder } from './models/authorization-policy-builder';
import { AuthorizationOptions } from './models/authorization-options';

describe('NgxPolicyAuthorizationModule', () => {
  describe('when imported as default', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NgxPolicyAuthorizationModule],
      });
    });
    describe('the AuthorizsationService', () => {
      it('should be provides', () => {
        const service = TestBed.inject(AuthorizationService);
        expect(service).toBeTruthy();
      });
    });
    describe('the AuthorizationOptions', () => {
      let options: AuthorizationOptions;
      beforeEach(() => {
        options = TestBed.inject(AuthorizationOptions);
      });
      it('should be provided', () => {
        expect(options).toBeTruthy();
      });
      it('should be default options', () => {
        expect(options).toEqual(new AuthorizationOptions());
      });
    });
  });
  describe('when imported with policies', () => {
    const action = (x: AuthorizationOptions) => {
      x.addPolicy('default', (c: AuthorizationPolicyBuilder): void => {
        c.staticValue(true);
      });
    };
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NgxPolicyAuthorizationModule.withPolicies(action)],
      });
    });
    it('should provide AuthorizationOptions like defined', () => {
      const moduleOptions = TestBed.inject(AuthorizationOptions);
      const definedOptions = new AuthorizationOptions();
      action(definedOptions);
      expect(moduleOptions).toEqual(definedOptions);
    });
  });
});
