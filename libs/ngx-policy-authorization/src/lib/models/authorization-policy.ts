import { IRequirement } from '../requirements/i-requirement';
import { AuthorizationContext } from './authorization-context';

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
  public authorize(context: AuthorizationContext): boolean {
    return this.requirements.every((req: IRequirement): boolean => req.handle(context));
  }
}
