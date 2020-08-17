import { IRequirement } from './i-requirement';
import { IAuthorizationContext } from './iauthorization-context';

/**
 * Represents a created policy based on diffrent requirements
 *
 * @export
 * @class AuthorizationPolicy
 */
export class AuthorizationPolicy {
  private readonly requirements: IRequirement[];
  constructor(requirements: IRequirement[]) {
    this.requirements = requirements;
  }
  public authorize(context: IAuthorizationContext): boolean {
    return this.requirements.every((req: IRequirement): boolean => req.handle(context));
  }
}
