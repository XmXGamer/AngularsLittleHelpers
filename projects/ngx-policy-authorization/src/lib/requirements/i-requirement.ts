export interface IRequirement {
    handle(permissions: string[]): boolean;
}
