"use client";

import React, { useMemo } from "react";
import { BarChart } from "@tremor/react";
import { POLL_LIST } from "../../mock";

import { createClient } from "@/utils/supabase/server";

async function getData(pollId) {
  const supabase = createClient();

  const { data: pollData } = await supabase
    .from("poll")
    .select()
    .eq("id", pollId);
}
export default function PollId({ params }) {
  const pollData = useMemo(function getPollData() {
    return POLL_LIST[0].options.reduce((acc, data) => {
      return [{ item: data.value, votes: 5 }, ...acc];
    }, []);
  }, []);

  return (
    <div>
      <BarChart
        className="h-screen	"
        data={pollData}
        index="item"
        categories={["votes"]}
        colors={["blue", "green"]}
        // valueFormatter={dataFormatter}
        yAxisWidth={48}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}
