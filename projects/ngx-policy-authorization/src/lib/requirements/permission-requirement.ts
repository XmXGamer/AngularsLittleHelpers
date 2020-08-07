import { IRequirement } from './i-requirement';

export class PermissionRequirement implements IRequirement{
    private _permission: string;
    constructor(permission: string){
        this._permission = permission;
    }
    handle(permissions: string[]): boolean {
        return permissions.includes(this._permission);
    }
}
