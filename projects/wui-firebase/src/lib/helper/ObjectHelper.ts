export function dateFromString(value: string): Date {
    let d = new Date();
    d.setTime(Date.parse(value));
    return d;
}

export class ObjectHelper {
    
    static fromJson(object: any, json: any) {
        return json == undefined ? undefined : Object.assign(object, json);
    }

    static toJson(object) {
        let json = {};
        Object.keys(object).forEach(key => { 
            if(object[key] !== null) { json[key] = object[key]; } 
        });
        return json;
    }

}