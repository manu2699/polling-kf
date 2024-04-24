import { createClient } from "@/utils/supabase/server";

async function getData() {
	const supabase = createClient();
	const { data } = await supabase.from("poll").select();

	console.log("polls list", data);

	return data;
}

export default async function Home() {
	let dt = await getData();

	return <main className={"bg-red-500"}>Poll</main>;
}
