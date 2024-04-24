import { createClient } from "@/utils/supabase/server";

async function getData(pollId: string) {
	const supabase = createClient();
	const { data: pollData } = await supabase
		.from("poll")
		.select()
		.eq("id", pollId);

	// const { data, error } = await supabase
	// 	.from('pollOptions')
	// 	.select(`
	// 		id,
	// 		name,
	// 		pollId:poll (title, isMultiple)
	// 	`);
	// console.log('data :: ', data)

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

	return { ...pollData[0], options: pollOptionsData };
}

export default async function PollId({ params }: { params: { id: string } }) {
	let dt = await getData(params.id);
  console.log("polls & options :: ", dt);

	return <div className={""}>Poll {params.id}</div>;
}
