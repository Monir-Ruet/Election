import { NextResponse } from "next/server";

export class Result<TData = unknown, TError = unknown> {
    public status: number;
    public message: string;
    public data?: TData;
    public error?: TError;

    constructor(status: number, message: string, data?: TData, error?: TError) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    public static json<TData = unknown, TError = unknown>(
        status: number,
        message: string,
        data?: TData,
        error?: TError
    ) {
        return NextResponse.json(
            new Result<TData, TError>(status, message, data, error),
            { status }
        );
    }
}