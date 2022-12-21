export interface Data<T> {
    data: T;
    loading: boolean;
    error?: string;
    updatedOn: Date;
}

export function defaultData<T>(data: T, loading = false): Data<T> {
    return {
        data,
        loading,
        error: undefined,
        updatedOn: new Date(),
    };
}

export function loading<T>(
    data: Data<T>,
    loading: 'start' | 'end' = 'start',
): Data<T> {
    return { ...data, loading: loading === 'start' ? true : false };
}
