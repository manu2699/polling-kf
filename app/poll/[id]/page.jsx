import React from "react";
import { createClient } from "@/utils/supabase/server";
import { VotingComponent } from "./components/index.jsx";

async function getData({ pollId }) {
	// const userCookie = cookies().get("userId");

	const supabase = createClient();

	const { data, error } = await supabase
		.from("poll")
		.select()
		.eq("id", pollId);
	if (error) {
		return { error: error.message };
	}

	const { data: pollOptions, error: optionsError } = await supabase
		.from("pollOptions")
		.select()
		.eq("pollId", pollId);

	if (optionsError) {
		return { error: optionsError.message };
	}

	return { data: { ...data[0], options: pollOptions } };
}

export default async function PollId({ params }) {
	let { data, error } = await getData({ pollId: params.id });

	async function handleSubmit(data) {
		"use server";
		console.log("submit data", data);
	}

	if (error) {
		return <div>{error}</div>;
	}

	return <VotingComponent pollInfo={data} onSubmit={handleSubmit} />;
}
