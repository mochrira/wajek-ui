import { ObjectHelper } from '../helper/ObjectHelper';

export class Akses {

    id: number;
    uid: string;
    idLembaga: number;
    tipe: string;
    idUndangan: number;
    isDefault: boolean;

    static fromJson(json: any) : void {
        return ObjectHelper.fromJson(new this(), json);
    }

    toJson() : Object {
        return ObjectHelper.toJson(this);
    }

}