"use client";

import React, { useState } from "react";
import { POLL_LIST } from "../mock";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Poll from "@/components/poll";

export default function PollId({ params }) {
  const [selectedPollOption, setSelectedPollOption] = useState();
  let [pollInfo] = POLL_LIST.filter((data) => data.id === params.id);

  function onSingleSelectChange(data) {
    console.log(data, "data");
    setSelectedPollOption(data);
  }

  return (
    <div className="p-10">
      <Card className="">
        <p className="font-medium text-slate-600 m-4">{pollInfo.question}</p>
        <div className="h-px w-full bg-slate-400	mb-6" />
        {pollInfo.isMulti ? (
          <MultiSelect options={pollInfo.options} />
        ) : (
          <SingleSelect
            onSingleSelectChange={onSingleSelectChange}
            options={pollInfo.options}
          />
        )}
      </Card>
    </div>
  );
}

function SingleSelect({ options, onSingleSelectChange }) {
  console.log(options, "options");
  return (
    <RadioGroup onValueChange={onSingleSelectChange}>
      {options.map((option) => (
        <div
          key={option.id}
          id={option.id}
          className="font-medium text-slate-600 flex items-center space-x-2 mx-6 mb-6"
        >
          <RadioGroupItem value={option.value} id={option.id} />
          <Label htmlFor={option.id}>{option.value}</Label>
        </div>
      ))}
      {/* {options} */}
    </RadioGroup>
  );
}

function MultiSelect({ options }) {
  return (
    <div>
      {options.map((option) => (
        <div key={option.id} className="flex h-6 align-center">
          <Checkbox id="terms" />
          <Label htmlFor={option.id}>{option.value}</Label>
        </div>
      ))}
    </div>
  );
}
