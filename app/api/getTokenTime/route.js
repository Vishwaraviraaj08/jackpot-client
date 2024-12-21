import {NextResponse} from "next/server";

export async function GET(req) {
    return NextResponse.json({data : ['200', '300', '400']}, {status: 200});
}