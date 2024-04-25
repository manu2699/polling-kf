import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { PollsList, Title } from "./list.jsx";

async function getData() {
	const userCookie = cookies().get("userId");

	const supabase = createClient();

	const { data: othersPolls } = await supabase
		.from("poll")
		.select()
		.neq("createdBy", userCookie?.value || "");

	const { data: myPolls } = await supabase
		.from("poll")
		.select()
		.eq("createdBy", userCookie?.value || "");

	// console.log("polling list", {othersPolls, myPolls});

	return { othersPolls: othersPolls || [], myPolls: myPolls || [] };
}

export default async function Home() {
	const { othersPolls = [], myPolls = [] } = await getData();
	// console.log(othersPolls);

	async function handleItemClick({ id }) {
		"use server";
		// console.log("clicked", id);
		redirect(`/poll/${id}`);
	}

	async function handleCreatePoll() {
		"use server";
		console.log("clicked create poll");
		redirect("/poll/create");
	}

	return (
		<div className='flex flex-col	gap-4'>
			<div className='px-6 flex gap-4 items-center justify-between w-full border-b-2'>
				<div className='text-base	font-semibold	text-cyan-800	'>
					Polls Dashboard
				</div>
				<Button
					className='bg-slate-600 text-white m-2'
					variant='secondary'
					// href={"/poll/create"}
					onClick={handleCreatePoll}>
					Create Poll
				</Button>
			</div>

			<div className='px-6'>
				<Title>My polls list</Title>
				<PollsList
					// myPoll={true}
					pollsList={myPolls}
					onItemClick={handleItemClick}
				/>

				<Title>Others polls list</Title>
				<PollsList
					pollsList={othersPolls}
					onItemClick={handleItemClick}
				/>
			</div>
		</div>
	);
}
