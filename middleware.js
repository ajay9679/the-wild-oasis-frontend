import {NextResponse} from "next/server";
import { auth } from "@/app/_lib/auth";


/*export function middleware(request){
    console.log(request);
    return NextResponse.redirect(new URL("/about", request.url));
}*/

export async function middleware(request){
    const session = await auth();
    const {pathname} = request.nextUrl;
    console.log('PATHNAME: ',pathname)
    if(pathname === "/login" && session?.user) return NextResponse.redirect(new URL("/", request.url));
    if(pathname === "/account" && !session?.user) return NextResponse.redirect(new URL("/login", request.url));

    return NextResponse.next();
}

export const mid = auth;

export const config = {
    matcher:['/account/:path*', "/login"],
};

