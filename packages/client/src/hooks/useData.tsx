import { useState } from 'react';
import { Data } from '../models/data';

export const useData = <T,>(initialValue: T) => {
    const [data, setData] = useState<Data<T>>(new Data(initialValue));

    const setValue = (value: T) => {
        setData((d) =>
            d
                .setValue(value)
                .setError(undefined)
                .setLoading(false)
                .update()
                .clone(),
        );
    };

    const setLoading = (loading: boolean) => {
        setData((d) => d.setLoading(loading).clone());
    };

    const setError = (error: string | undefined, errorStatus?: number) => {
        setData((d) =>
            d.setLoading(false).setError(error, errorStatus).clone(),
        );
    };

    return {
        ...data,
        self: data,
        setValue,
        setLoading,
        setError,
    };
};
