import React from "react";
import { POLL_LIST } from "../mock";
import Poll from "@/components/poll";

export default function PollId({ params }) {
  let pollInfo = POLL_LIST[params.id];

  return (
    <div className="p-10">
      <Poll isCreation={false} />
    </div>
  );
}
