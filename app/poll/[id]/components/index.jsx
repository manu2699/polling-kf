"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function VotingComponent({ pollInfo, onSubmit }) {
  console.log(pollInfo, "pollInfo");
  const [selectedValue, setSelectedValue] = useState([]);
  function onSubmitHandler(value) {
    console.log(value, "selectedValue");
    onSubmit(value);
  }

  useEffect(function onUnmount() {
    return () => {
      setSelectedValue([]);
    };
  }, []);

  return (
    <div className="p-10">
      <Card className="">
        <p className="font-medium text-slate-600 m-4">{pollInfo.title}</p>
        <div className="h-px w-full bg-slate-400	mb-6" />
        {!pollInfo.isMulti ? (
          <MultiSelect
            onSelect={(state, value) => {
              if (state) {
                setSelectedValue((prevState) => [...prevState, value]);
              } else {
                let filteredData = selectedValue.filter(
                  (data) => data.id !== value.id
                );
                setSelectedValue(filteredData);
              }
            }}
            options={pollInfo.options}
          />
        ) : (
          <SingleSelect
            onSingleSelectChange={(option) => {
              console.log(option, "option");
              setSelectedValue([option]);
            }}
            options={pollInfo.options || []}
          />
        )}
        <Button
          onClick={() => onSubmitHandler(selectedValue)}
          className="bg-slate-600 text-white mx-6 mb-6"
        >
          Submit
        </Button>
      </Card>
    </div>
  );
}

function SingleSelect({ options, onSingleSelectChange }) {
  // console.log(options, "options");
  return (
    <RadioGroup onValueChange={onSingleSelectChange}>
      {options.map((option) => (
        <div
          key={option.id}
          id={option.id}
          className="font-medium text-slate-600 flex items-center space-x-2 mx-6 mb-6"
        >
          <RadioGroupItem value={option} id={option.id} />
          <Label htmlFor={option.id}>{option.name}</Label>
        </div>
      ))}
      {/* {options} */}
    </RadioGroup>
  );
}

function MultiSelect({ options, onSelect }) {
  return (
    <div>
      {options?.map((option) => (
        <div
          key={option.id}
          className="flex h-6 align-center font-medium text-slate-600 flex items-center space-x-2 mx-6 mb-6"
        >
          <Checkbox
            onCheckedChange={(state) => onSelect(state, option)}
            id="terms"
          />
          <Label htmlFor={option.id}>{option.name}</Label>
        </div>
      ))}
    </div>
  );
}
