"use client";

import React, { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "../ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function Poll({ onSubmit }) {
  const [isMultiSelect, setIsMultiSelect] = useState(true);

  return (
    <Card className="m-6">
      <div className="flex flex-col items-center border-b-2 border-stale-900">
        <p className="font-medium text-slate-600 m-4">Poll type</p>
        <PollType
          isMultiSelect={isMultiSelect}
          onChange={(value) => {
            console.log(value, "poll type");
            setIsMultiSelect(value);
          }}
        />
      </div>
      <div className="p-6">
        <Input type="text" placeholder="Enter your question here.." />

        <PollOption isMultiSelect={isMultiSelect} />
      </div>
    </Card>
  );
}

function PollType({ onChange, isMultiSelect }) {
  return (
    <RadioGroup
      className="flex items-center"
      value={isMultiSelect}
      onValueChange={onChange}
    >
      <div
        id={"single_select"}
        className="font-medium text-slate-600 flex items-center space-x-2 mx-6 mb-6"
      >
        <RadioGroupItem value={false} id={"single_select"} />
        <Label htmlFor={"single_select"}>Single select</Label>
      </div>
      <div
        id={"multi_select"}
        className="font-medium text-slate-600 flex items-center space-x-2 mx-6 mb-6"
      >
        <RadioGroupItem value={true} id={"multi_select"} />
        <Label htmlFor={"single_select"}>Multi select</Label>
      </div>
      {/* {options} */}
    </RadioGroup>
  );
}

function PollOption({ isMultiSelect }) {
  const [pollOptions, setPollOptions] = useState([
    { id: "options_1", value: "Options 1" },
    { id: "options_2", value: "Options 2" },
  ]);
  const [isEditable, setIsEditable] = useState(false);

  function onOptionUpdate(id, value) {
    // const [fieldToUpdate] = pollOptions.filter((data) => data.id === id);
    console.log({ id, value }, "onOptionUpdate");
    const updatedList = pollOptions.map((data) => {
      if (data.id === id && value) {
        data.value = value;
      }
      return data;
    });
    setPollOptions(updatedList);
    setIsEditable("");
    console.log(updatedList, "updatedList");
  }

  function EditableCheckBox() {
    return pollOptions.map((option) => (
      <div
        key={option.id}
        className="flex mt-6 h-6 align-center font-medium text-slate-600 flex items-center space-x-2 mx-6 mb-6"
      >
        <Checkbox id="terms" />
        <EditableOption
          onValueChange={onOptionUpdate}
          id={option.id}
          value={option.value}
          isEditable={isEditable}
          onChangeAsEditable={(value) => setIsEditable(value)}
        />
      </div>
    ));
  }

  return (
    <div>
      {isMultiSelect ? <EditableCheckBox /> : <div>single select </div>}
      <Button
        onClick={() =>
          setPollOptions((prevState) => [
            ...prevState,
            {
              id: `option_${prevState.length}`,
              value: `Option ${prevState.length}`,
            },
          ])
        }
        className="bg-slate-600 text-white m-2"
      >
        + Add options
      </Button>
    </div>
  );
}

function EditableOption({
  id,
  value,
  onValueChange,
  isEditable,
  onChangeAsEditable,
}) {
  if (id === isEditable) {
    return (
      <Input
        onBlur={(event) => onValueChange(id, event.target.value)}
        type="text"
        placeholder="Enter option here.."
      />
    );
  }
  return (
    <Label
      onClick={(e) => {
        onChangeAsEditable(id);
      }}
      htmlFor={id}
    >
      {value}
    </Label>
  );
}
