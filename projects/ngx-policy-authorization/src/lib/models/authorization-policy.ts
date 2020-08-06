import { IRequirement } from '../requirements/i-requirement';

export class AuthorizationPolicy {
    private _requirements: IRequirement[];
    constructor(requirements: IRequirement[]){
        this._requirements = requirements;
    }
  authorize(permissions: string[]): boolean {
    return this._requirements.every(req => req.handle(permissions));
  }
}
