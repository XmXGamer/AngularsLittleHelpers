import { IRequirement } from './i-requirement';

export class StaticValueRequirement implements IRequirement{
    private _stativValue: boolean;
    constructor(staticValue: boolean){
        this._stativValue = staticValue;
    }
    handle(permissions: string[]): boolean {
        return this._stativValue;
    }
}
