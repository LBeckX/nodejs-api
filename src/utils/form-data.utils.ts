export function removeUndefinedVal<T>(obj: Record<string, any>): T {
    const tmp: T = {} as T;
    for (const key in obj) {
        if (obj[key] !== undefined) {
            tmp[key] = obj[key];
        }
    }
    return tmp;
}