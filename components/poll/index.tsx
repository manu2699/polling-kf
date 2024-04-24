"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function ActionButton({
  isCheckBox = true,
  isPollCreation,
  title = "Options",
  onPress = () => {},
  item = {},
  onOptionsChange,
  className,
}: any) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditableTitle, setEditableTitle] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  function handleSelection() {
    setIsChecked(!isChecked);
    console.log("calledbakkskdfsd");
    onPress();
  }
  function editOptions(e: any) {
    console.log("editOptions");
    e.stopPropagation();
    setEditableTitle(true);

    if (isPollCreation) {
    }
  }
  function onInputBlur(e: any) {
    setEditableTitle(false);
  }

  return (
    <div className="flex mx-6" onClick={() => handleSelection()}>
      {!isPollCreation && isCheckBox ? (
        <input type="checkbox" className="mr-2" checked={isChecked} />
      ) : (
        <input type="radio" className="mr-6" />
      )}
      <div
        className="font-sans font-md text-slate-600 font-medium"
        onClick={(e) => editOptions(e)}
      >
        {isEditableTitle ? (
          <input
            type="text"
            value={customTitle}
            className="text-black"
            onChange={(e) => setCustomTitle(e.target.value)}
            onBlur={(e) => onInputBlur(e)}
          />
        ) : (
          title
        )}
      </div>
    </div>
  );
}
function Poll({ isPollCreation, onSubmit, pollInfo }: any) {
  const [options, setOptions] = useState([
    { id: "guru", value: "options", isSelected: false, isCheckBox: false },
    { id: "guru2", value: "options", isSelected: false, isCheckBox: false },
    { id: "guru3", value: "options", isSelected: false, isCheckBox: false },
    { id: "guru4", value: "options", isSelected: false, isCheckBox: false },
  ]);
  const [title, setTitle] = useState("");
  function onPollCreation() {
    onSubmit({ title, options });
  }
  function onCreateOptions() {
    setOptions([
      ...options,
      {
        id: Math.random().toString(),
        value: "options",
        isSelected: false,
        isCheckBox: true,
      },
    ]);
  }
  return (
    <Card className="m-10">
      <div className="flex w-full flex-col items-center  border-b-1 p-6 border-b-2">
        <span className="text-base font-medium text-slate-800">Poll type</span>
        <div className="flex">
          <ActionButton
            onPress={() => console.log("createions")}
            title="Single answer"
            isCheckBox={true}
          />
          <ActionButton
            onPress={() => console.log("createions")}
            title="Multiple answer"
            isCheckBox={true}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-3 p-4">
        <div className="flex items-center">
          <span className="text-base font-medium text-slate-600 flex-none w-24">
            Poll title
          </span>
          <input
            type="text"
            className="flex-1	border-2 border-slate-200 rounded-md px-2 py-1 mx-6 w-full"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          {options.map((item, index) => (
            <div key={index}>
              <ActionButton
                isCheckBox={item.isSelected}
                title={item.value}
                item={item}
              />
            </div>
          ))}
        </div>

        <div className="flex w-full justify-between">
          <Button
            onClick={onCreateOptions}
            className="w-fit	bg-slate-600 text-white"
          >
            + add options
          </Button>
          <Button
            onClick={onPollCreation}
            className="w-fit	bg-slate-600 text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default Poll;
