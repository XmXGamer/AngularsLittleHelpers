import { PermissionChangeType } from './permission-change-type.enum';

export class PermissionChangedEvent {
    private _permissions: string[];
    public readonly type: PermissionChangeType;

    public get permissions(): ReadonlyArray<string>{
        return this._permissions;
    }

    constructor(type: PermissionChangeType, permissions: string[]){
        this.type = type;
        this._permissions = permissions;
    }
}
