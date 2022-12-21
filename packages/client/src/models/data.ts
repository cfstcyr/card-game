export class Data<T> {
    value: T;
    error: string | undefined;
    errorStatus: number | undefined;
    loading: boolean;
    updatedAt: Date;

    constructor(value: T) {
        this.value = value;
        this.error = undefined;
        this.errorStatus = undefined;
        this.loading = false;
        this.updatedAt = new Date();
    }

    setValue(value: T): this {
        this.value = value;
        return this;
    }

    setLoading(loading: boolean): this {
        this.loading = loading;
        return this;
    }

    setError(error: string | undefined, status?: number): this {
        this.error = error;
        this.errorStatus = status;
        return this;
    }

    update(): this {
        this.updatedAt = new Date();
        return this;
    }

    clone(): Data<T> {
        const d = new Data(this.value);
        d.error = this.error;
        d.errorStatus = this.errorStatus;
        d.loading = this.loading;
        d.updatedAt = this.updatedAt;
        return d;
    }
}
