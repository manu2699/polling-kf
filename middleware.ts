import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";

// user session middleware
export async function middleware(request: NextRequest) {
	if (!request.cookies.has("userId")) {
		const supabase = createClient();
		let { data, error } = await supabase
			.from("sessions")
			.insert([{ name: "test" }])
			.select();

		if(error) {
			console.log("Error :: ", error);
			return NextResponse.next();
		}

		// // const { data } = await supabase.from("usersessions").select();
		console.log("User session data :: ", data);

		const response = NextResponse.next();
		response.cookies.set("userId", data?.[0].id || "errror_id");

		return response;
	} else {
		console.log("userId", request.cookies.get("userId"));
	}
	return NextResponse.next();
}
