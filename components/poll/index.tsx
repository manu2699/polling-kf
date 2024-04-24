"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function ActionButton({
  isCheckBox = true,
  title = "Options",
  onPress = () => {},
}: any) {
  const [isChecked, setIsChecked] = useState(false);
  function handleSelection() {
    setIsChecked(!isChecked);
    onPress();
  }
  return (
    <div
      className="flex gap-2 px-2 py-2 bg-violet-500 rounded-md w-fit cursor-pointer min-w-48"
      onClick={() => handleSelection()}
    >
      {isCheckBox ? (
        <input type="checkbox" className="mr-2" checked={isChecked} />
      ) : (
        <input type="radio" className="mr-2" />
      )}
      <div className="font-sans font-md text-white font-medium">{title}</div>
    </div>
  );
}
function Poll({ isPollCreation }: any) {
  const [options, setOptions] = useState([
    { id: "guru", value: "options", isSelected: false, isCheckBox: false },
    { id: "guru2", value: "options", isSelected: false, isCheckBox: false },

    { id: "guru3", value: "options", isSelected: false, isCheckBox: false },

    { id: "guru4", value: "options", isSelected: false, isCheckBox: false },
  ]);
  return (
    <div className="grid gird-cols-8">
      <div className="grid-span-2"></div>
      <div className="grid-span-4 bg-blue-100">
        <div className="flex flex-col p-3 rounded-md border-2 border-slate-200">
          <div className="flex gap-3">
            <span>Poll type</span>{" "}
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
        <div className="flex flex-col gap-y-3">
          <div>
            <span>Poll title</span>
            <input
              type="text"
              className="border-2 border-slate-200 rounded-md px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            {options.map((item, index) => (
              <div key={index}>
                <ActionButton isCheckBox={item.isSelected} title={item.value} />
              </div>
            ))}
          </div>
          <div className="cursor-pointer bg-violet-700 text-white font-medium w-fit px-5 py-2 rounded-md">
            + add options
          </div>
        </div>
      </div>
      <div className="grid-span-2"></div>
    </div>
  );
}

export default Poll;
