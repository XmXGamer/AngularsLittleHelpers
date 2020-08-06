import { StaticValueRequirement } from './requirements/static-value-requirement';
import { IRequirement } from './requirements/i-requirement';
import { AuthorizationPolicy } from './authorization-policy';
import { PermissionRequirement } from './requirements/permission-requirement';
import { ExcludePermissionRequirement } from './requirements/exclude-permission-requirement';

export class AuthorizationPolicyBuilder {
    private _requirements: IRequirement[] = [];
    
    build(): AuthorizationPolicy {
        return new AuthorizationPolicy(this._requirements);
    }
    public staticValue(val: boolean): AuthorizationPolicyBuilder{
        this._requirements.push(new StaticValueRequirement(val));
        return this;
    }
    
    hasPermission(arg0: string): AuthorizationPolicyBuilder {
        this._requirements.push(new PermissionRequirement(arg0));
        return this;
    }

    excludePermission(arg0: string): AuthorizationPolicyBuilder {
        this._requirements.push(new ExcludePermissionRequirement(arg0));
        return this;
    }

    addRequirement(arg0: IRequirement): AuthorizationPolicyBuilder{
        this._requirements.push(arg0);
        return this;
    }

}
