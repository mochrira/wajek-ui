import { ObjectHelper } from '../helper/ObjectHelper';

export class Pengguna {

    uid: string;
    email: string;
    displayName: string;
    photoUrl: string;

    private _emailVerified: boolean;
    set emailVerified(value: any) { 
        this._emailVerified = (value == 1) ? true : false; 
    }
    get emailVerified() { 
        return this._emailVerified; 
    }

    static fromJson(json: any) {
        return ObjectHelper.fromJson(new this(), json);
    }

    toJson() {
        return ObjectHelper.toJson(this);
    }

}