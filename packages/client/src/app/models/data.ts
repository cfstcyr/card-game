export interface DataLoading {
    value?: undefined;
    error?: undefined;
    loading: true;
}

export interface DataError {
    value?: undefined;
    error: Error;
    loading?: false;
}

export interface DataLoaded<T> {
    value: T;
    error?: undefined;
    loading?: false;
}

export type Data<T> = DataLoading | DataError | DataLoaded<T>;