import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { POLL_LIST } from "./mock.js";

const my_session_id = "venky001_session_id";

export default function Home() {
  let myPolls = [];
  let othersPolls = [];
  POLL_LIST.forEach((poll) => {
    if (poll.createdBy.id === my_session_id) {
      myPolls.push(poll);
    } else {
      othersPolls.push(poll);
    }
  });

  return (
    <div className="flex flex-col	gap-4">
      <div className="px-6 flex gap-4 items-center justify-between w-full border-b-2">
        <div className="text-base	font-semibold	text-cyan-800	">
          Polls Dashboard
        </div>
        <Button className="bg-cyan-900	text-white	m-2" variant="secondary">
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
          className="h-10 p-5 flex items-center justify-between border-b-2	"
          key={pollInfo.id}
        >
          <span className="text-sm font-medium text-slate-600">
            {pollInfo.question}
          </span>
          {myPoll && <Button variant="secondary">View report</Button>}
        </div>
      ))}
    </Card>
  );
}

function Title({ children }) {
  return (
    <div className="mb-4 text-base	font-medium border-cyan-800 text-slate-800		">
      {children}
    </div>
  );
}
