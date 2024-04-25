import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Poll from "@/components/poll/index";

export default function Home() {
	async function handleSubmit(data: any) {
		"use server";

		console.log("dt submit", data);

		let answersData = data.options.filter(
			(opt: { isCorrect: boolean }) => opt.isCorrect
		);

		if (answersData.length === 0) {
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
				createdBy: userCookie?.value || ""
			})
			.select();

		if (pollError) {
			return { error: pollError.message };
		}

		data.options.forEach(async (option: any) => {
      // create poll options
			let { data: pollOption, error: pollError } = await supabase
				.from("pollOptions")
				.insert({ name: option.value, pollId: pollData[0].id })
				.select();
  
      // create answers
			if (pollOption?.[0] && option.isCorrect) {
				let { data: pollAnswer, error: pollAnswerError } =
					await supabase
						.from("answers")
						.insert({
							pollId: pollData[0].id,
							optionId: pollOption[0].id
						}).select();
			}
		});

		// console.log("pollData", pollData);

		redirect("/");
	}
	return (
		<div>
			<Poll onSubmit={handleSubmit} />
		</div>
	);
}
