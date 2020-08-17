import { IAuthorizationContext } from './iauthorization-context';

export interface IRequirement {
  handle(context: IAuthorizationContext): boolean;
}
