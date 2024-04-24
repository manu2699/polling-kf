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
      <div className="h-10 px-6 flex gap-4 items-center justify-between w-full border-b-2">
        <div>Polls Dashboard</div>
        <Link variant="secondary" href={"/poll/create"}>
          Create Poll
        </Link>
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
          className="h-10 p-5 flex items-center justify-between border-b-2	"
          key={pollInfo.id}
        >
          <span>{pollInfo.title}</span>
          {myPoll && <Button variant="secondary">View report</Button>}
        </div>
      ))}
    </Card>
  );
}

function Title({ children }) {
  return <div className="mb-4">{children}</div>;
}
