"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function ActionButton({
  isCheckBox = true,
  isPollCreation,
  title = "Options",
  onPress = () => {},
  item = {},
  onOptionsChange,
}: any) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditableTitle, setEditableTitle] = useState(false);
  const [customTitle, setCustomTitle] = useState(title);
  function handleSelection() {
    setIsChecked(!isChecked);
    console.log("calledbakkskdfsd");
    onPress();
  }
  function editOptions(e: any) {
    console.log("editOptions");
    e.stopPropagation();
    setEditableTitle(true);
  }
  function onInputBlur(e: any) {
    setEditableTitle(false);
    onOptionsChange(item.id, customTitle);
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

      <div
        className="font-sans font-md text-white font-medium"
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
          customTitle
        )}
      </div>
    </div>
  );
}
function Poll({ isPollCreation, onSubmit }: any) {
  const [options, setOptions] = useState([
    { id: "guru", value: "options" },
    { id: "guru2", value: "options" },
    { id: "guru3", value: "options" },
    { id: "guru4", value: "options" },
  ]);
  const [title, setTitle] = useState("");
  const [isSingleSelect, setIsSingleSelect] = useState(true);
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  function onPollCreation() {
    onSubmit({ title, options, isMultiple: isMultiSelect || isSingleSelect });
    console.log({
      title,
      options,
      isMultiple: isMultiSelect || isSingleSelect,
    });
  }
  function onCreateOptions() {
    setOptions([
      ...options,
      {
        id: Math.random().toString(),
        value: "options",
      },
    ]);
  }

  function onOptionsChange(id: string, title: string) {
    setOptions(
      options.map((item) => (item.id === id ? { ...item, value: title } : item))
    );
  }
  return (
    <div className="grid grid-cols-3">
      <div className="grid cols-span-2"></div>
      {isPollCreation ? (
        <div className="grid cols-span-4">
          <div className="flex flex-col p-3 rounded-md border-2 border-slate-200">
            <div className="flex gap-3">
              <span>Poll type</span>{" "}
              <ActionButton
                onPress={() => setIsSingleSelect(!isSingleSelect)}
                title="Single answer"
                isCheckBox={isSingleSelect}
              />
              <ActionButton
                onPress={() => setIsMultiSelect(!isMultiSelect)}
                title="Multiple answer"
                isCheckBox={isMultiSelect}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <div>
              <span>Poll title</span>
              <input
                type="text"
                className="border-2 border-slate-200 rounded-md px-2 py-1"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              {options.map((item, index) => (
                <div key={index}>
                  <ActionButton
                    // isCheckBox={item.isSelected}
                    title={item.value}
                    item={item}
                    onOptionsChange={onOptionsChange}
                  />
                </div>
              ))}
            </div>
            <div
              onClick={onCreateOptions}
              className="cursor-pointer bg-violet-600 text-white font-medium w-fit px-5 py-2 rounded-md"
            >
              + add options
            </div>
            <div
              onClick={onPollCreation}
              className="cursor-pointer bg-violet-800 text-white font-medium w-fit px-5 py-2 rounded-md"
            >
              Submit
            </div>
          </div>
        </div>
      ) : (
        <div className="grid cols-span-4">
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
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              {options.map((item, index) => (
                <div key={index}>
                  <ActionButton
                    // isCheckBox={item.isSelected}
                    title={item.value}
                    isPollCreation={isPollCreation}
                  />
                </div>
              ))}
            </div>
            <div
              onClick={onCreateOptions}
              className="cursor-pointer bg-violet-600 text-white font-medium w-fit px-5 py-2 rounded-md"
            >
              + add options
            </div>
            <div
              onClick={onPollCreation}
              className="cursor-pointer bg-violet-800 text-white font-medium w-fit px-5 py-2 rounded-md"
            >
              Submit
            </div>
          </div>
        </div>
      )}
      <div className="grid cols-span-2"></div>
    </div>
  );
}

export default Poll;
