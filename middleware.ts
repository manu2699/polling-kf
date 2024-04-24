import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// user session middleware
export function middleware(request: NextRequest) {
	// Assume a "Cookie:nextjs=fast" header to be present on the incoming request
	// Getting cookies from the request using the `RequestCookies` API

	// let cookie = request.cookies.get("uid");
	// console.log(cookie); 

  if(!request.cookies.has("uid")) {
    const response = NextResponse.next();
    response.cookies.set("uid", Math.random().toString(36).substring(7));
    return response;
  }else{
    console.log("uid", request.cookies.get("uid"));
  }
  return NextResponse.next();
}
