import { AuthorizationContext } from '../models/authorization-context';

export interface IRequirement {
  handle(context: AuthorizationContext): boolean;
}
