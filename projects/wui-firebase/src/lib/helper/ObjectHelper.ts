export class ObjectHelper {
    
    static fromJson(object: any, json: any) {
        let keys = Object.keys(object);
        Object.keys(json).forEach((key) => {
            if(keys.indexOf(key) != -1) {
                object[key] = json[key];
            }
        });
        return object;
    }

    static toJson(object: any) {
        var json = {};
        Object.keys(object).forEach(key => { 
            if(object[key] != null) { json[key] = object[key]; } 
        });
        return json;
    }

}