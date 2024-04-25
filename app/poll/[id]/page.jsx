import React from "react";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { VotingComponent } from "./components/index.jsx";
// import { redirect } from "next/dist/server/api-utils/index.js";

async function getData({ pollId }) {
  const userCookie = cookies().get("userId");

  const supabase = createClient();

  const { data, error } = await supabase.from("poll").select().eq("id", pollId);
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

  const { data: votesPoll, error: votesError } = await supabase
    .from("votes")
    .select()
    .eq("pollId", pollId)
    .eq("sessionId", userCookie.value);

  if (votesPoll.length > 0) {
    console.log("already voted :: ", votesPoll)

    redirect(`/poll/${pollId}/voted`)
    return
  }

  return { data: { ...data[0], options: pollOptions } };
}

export default async function PollId({ params }) {
  let { data: pollData, error } = await getData({ pollId: params.id });

  async function handleSubmit(data) {
    "use server";
    console.log("vote submit", data, pollData);

    const userCookie = cookies().get("userId");

    if (!pollData.isMultiple && data.length !== 1) {
      return { error: "multiple answers selected" }
    }

    const supabase = createClient();
    let hasError = false;

    data.forEach(async (datum) => {
      const { data: voteData, error: voteError } = await supabase
        .from("votes").insert({
          pollId: datum.pollId,
          optionId: datum.id,
          sessionId: userCookie?.value
        }).select()
      console.log("voted :: ", voteData, voteError)
      if (voteError) {
        hasError = true;
      }
    })

    if (!hasError) {
      redirect(`/poll/${params.id}/voted`)
    }

  }


  if (error) {
    return <div>{error}</div>;
  }

  return <VotingComponent pollInfo={pollData} onSubmit={handleSubmit} />;
}
