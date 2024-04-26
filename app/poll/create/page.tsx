import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Poll from "@/components/poll/index";

export default function Home() {
	async function handleSubmit(data: any) {
		"use server";

		let answersData = data.options.filter(
			(opt: { isCorrect: boolean }) => opt.isCorrect
		);

		if (answersData.length === 0) {
			console.log("error while submitting :: one required")
			return { error: "Please select atleast one correct answer" };
		}

		const userCookie = cookies().get("userId");
		console.log("cookies", userCookie);

		const supabase = createClient();

		const { data: pollData, error: pollError } = await supabase
			.from("poll")
			.insert({
				title: data.question,
				isMultiple: answersData.length > 1,
				createdBy: userCookie?.value || "",
			})
			.select();

		console.log("poll option data", pollData, pollError)

		if (pollError) {
			console.error("error while poll ::", pollError);
			return { error: pollError.message };
		}

		data.options.forEach(async (option: any) => {
			// create poll options
			let { data: pollOption, error: optionError } = await supabase
				.from("pollOptions")
				.insert({ name: option.value, pollId: pollData[0].id })
				.select();

			if (optionError) {
				console.error("poll option error :: ", optionError)
			}

			// create answers
			if (pollOption?.[0] && option.isCorrect) {
				await supabase
					.from("answers")
					.insert({
						pollId: pollData[0].id,
						optionId: pollOption[0].id,
					})
					.select();
			}
		});

		// console.log("pollData", pollData);

		redirect("/poll");
	}
	return (
		<div>
			<Poll onSubmit={handleSubmit} />
		</div>
	);
}
