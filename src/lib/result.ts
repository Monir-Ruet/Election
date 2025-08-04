import { NextResponse } from "next/server";

export class Result {
    public status: number;
    public message: string;
    public data: any;
    public error: any;

    constructor(status: number, message: string, data: any = undefined, error: any = undefined) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    public static json(status: number, message: string, data: any = undefined, error: any = undefined) {
        return NextResponse.json(
            new Result(status, message, data, error),
            { status: status }
        );
    }
}