export const isKey = (variable: any): variable is string | number => typeof variable === 'string' || typeof variable === 'number';
