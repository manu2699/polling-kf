import Link from "next/link.js";
import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

// import { redirect } from 'next/navigation'

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

  return { othersPolls, myPolls };
}

export default async function Home() {
  let { othersPolls, myPolls } = await getData();
  // console.log(othersPolls);

  return (
    <div className="flex flex-col	gap-4">
      <div className="px-6 flex gap-4 items-center justify-between w-full border-b-2">
        <div className="text-base	font-semibold	text-cyan-800	">
          Polls Dashboard
        </div>
        <Button
          className="bg-slate-600 text-white m-2"
          variant="secondary"
          href={"/poll/create"}
        >
          Create Poll
        </Button>
      </div>

      <div className="px-6">
        <Title>My polls list</Title>
        <PollsList myPoll={true} pollsList={myPolls} />

        <Title>Others polls list</Title>
        <PollsList pollsList={othersPolls} />
      </div>
    </div>
  );
}

function PollsList({ pollsList, myPoll = false }) {
  return (
    <Card className="mb-4">
      {pollsList.map((pollInfo) => (
        <div
          className="p-5 flex items-center justify-between border-b-2	"
          key={pollInfo.id}
        >
          <span className="text-sm font-medium text-slate-600">
            {pollInfo.question}
          </span>
          {myPoll && (
            <Button
              className="text-blue-600 text-sm font-medium"
              variant="secondary"
              size="medium"
            >
              view report
            </Button>
          )}
        </div>
      ))}
    </Card>
  );
}

function Title({ children }) {
  return (
    <div className="mb-4 text-base font-medium border-cyan-800 text-slate-800">
      {children}
    </div>
  );
}
