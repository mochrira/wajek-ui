import { ObjectHelper } from '../helper/ObjectHelper';

export class Lembaga {

    idLembaga: number;
    nmLembaga: string;
    alamat: string;
    kota: string;
    photoUrl: string;

    private _tglRegistrasi: Date;
    set tglRegistrasi(value: string) {
        this._tglRegistrasi = new Date();
        this._tglRegistrasi.setTime(Date.parse(value));
    }
    get tglRegitrasi() { return this._tglRegistrasi; }

    static fromJson(json: any) {
        return ObjectHelper.fromJson(new this(), json);
    }

    toJson() {
        return ObjectHelper.toJson(this);
    }

}