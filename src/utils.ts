export const isDefined = (variable: any): boolean => {
    return variable !== undefined && variable !== null;
}

export const isObject = (variable: any): boolean => {
    return typeof variable === 'object' && variable !== null;
}

export const noop = () => {};

export const extend = (...objects: object[]): object => {
    const result: any = objects[0];

    for(const iterator of objects) {
        for(const key in iterator) {
            // @ts-ignore
            result[key] = iterator[key];
        }
    }

    return result;
}

export const deepExtend = (...objects: object[]): object => {
    let depth = 3;

    const _deepExtend = (...objects: object[]) => {
        const result: any = objects[0];

        for(const iterator of objects) {
            for(const key in iterator) {
                // @ts-ignore
                const value = iterator[key];

                if(isObject(value) && depth > 0) {
                    result[key] = deepExtend(value)
                    depth--;
                }
                else {
                    result[key] = value;
                }
            }
        }

        return result;
    }

    return _deepExtend(...objects);
}