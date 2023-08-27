export const isDefined = <T>(variable: T): variable is NonNullable<T> => {
    return variable !== undefined && variable !== null;
};

export const isObject = (variable: any): variable is object => {
    return typeof variable === 'object' && variable !== null;
};

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
};

export const deepExtend = <T extends object>(...objects: T[]): T => {
    let depth = 3;

    const _deepExtend = (...objects: T[]) => {
        const result: any = objects[0];

        for(const iterator of objects) {
            for(const key in iterator) {
                const value = iterator[key];

                if(isObject(value) && depth > 0) {
                    result[key] = deepExtend(value);
                    depth--;
                }
                else {
                    result[key] = value;
                }
            }
        }

        return result;
    };

    return _deepExtend(...objects);
};

export const toPixels = (size: number | undefined): string | undefined => {
    if(isDefined(size)) {
        return size + 'px';
    }

    return undefined;
};