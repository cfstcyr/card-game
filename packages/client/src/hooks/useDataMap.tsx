import { useCallback, useState } from 'react';
import { Data } from '../models/data';

export const useDataMap = <T,>(defaultValue: T | undefined) => {
    const [map, setMap] = useState<{ [K: string]: Data<T> }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const get = useCallback(
        (key: string): Data<T> => {
            return map[key];
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
        setIsLoading(loading);
        setMap((m) => ({
            ...m,
            [key]: (m[key] ?? new Data(defaultValue))
                .setLoading(loading)
                .clone(),
        }));
    };

    const setLoadingAll = (loading: boolean) => {
        setIsLoading(loading);
        setMap((m) => {
            for (const k of Object.keys(m)) {
                m[k].setLoading(true).clone();
            }
            return { ...m };
        });
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

    const setErrorAll = (error: string | undefined, errorStatus?: number) => {
        setMap((m) => {
            for (const k of Object.keys(m)) {
                m[k].setLoading(false).setError(error, errorStatus).clone();
            }
            return { ...m };
        });
    };

    return {
        ...map,
        self: map,
        get,
        setValue,
        setLoading,
        setLoadingAll,
        setError,
        setErrorAll,
        isLoading,
    };
};
