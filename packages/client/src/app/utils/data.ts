import { Data, DataError, DataLoaded, DataLoading } from "../models/data";

export function isLoading(data: any): data is DataLoading {
    return !!data.loading;
}

export function isError(data: any): data is DataError {
    return !!data.error;
}

export function isLoaded(data: any): data is DataLoaded<unknown> {
    return !!data.value || (!data.loading && !data.error);
}