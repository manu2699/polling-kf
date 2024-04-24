import { createClient } from "@/utils/supabase/server";

async function getData(pollId: string) {
	const supabase = createClient();
	const { data: pollData } = await supabase
		.from("poll")
		.select()
		.eq("id", pollId);

	if (!pollData) {
		return { error: "Poll not found" };
	}

	const { data: pollOptionsData } = await supabase
		.from("pollOptions")
		.select()
		.eq("pollId", pollId);

	if (!pollOptionsData) {
		return { error: "Poll options not found" };
	}

	// console.log("polls & options :: ", pollData, pollOptionsData);

	return { ...pollData, options: pollOptionsData };
}

export default async function PollId({ params }: { params: { id: string } }) {
	let dt = await getData(params.id);
  console.log("polls & options :: ", dt);

	return <div className={""}>Poll {params.id}</div>;
}
