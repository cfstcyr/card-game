import { useCallback, useState } from 'react';
import { Data } from '../models/data';

export const useDataMap = <T,>(defaultValue: T) => {
    const [map, setMap] = useState<{ [K: string]: Data<T> }>({});

    const get = useCallback(
        (key: string): Data<T> => {
            return map[key];
        },
        [map],
    );

    const getOrDefault = useCallback(
        (key: string): Data<T> => {
            return map[key] ?? new Data<T>(defaultValue);
        },
        [map],
    );

    const setValue = (key: string, value: T) => {
        setMap((m) => ({
            ...m,
            [key]: (m[key] ?? new Data(defaultValue))
                .setValue(value)
                .setError(undefined)
                .setLoading(false)
                .update()
                .clone(),
        }));
    };

    const setLoading = (key: string, loading: boolean) => {
        setMap((m) => ({
            ...m,
            [key]: (m[key] ?? new Data(defaultValue))
                .setLoading(loading)
                .clone(),
        }));
    };

    const setError = (
        key: string,
        error: string | undefined,
        errorStatus?: number,
    ) => {
        setMap((m) => ({
            ...m,
            [key]: (m[key] ?? new Data(defaultValue))
                .setLoading(false)
                .setError(error, errorStatus)
                .clone(),
        }));
    };

    return {
        ...map,
        self: map,
        get,
        getOrDefault,
        setValue,
        setLoading,
        setError,
    };
};
