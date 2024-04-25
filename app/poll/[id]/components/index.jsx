"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function VotingComponent({ pollInfo, onSubmit }) {
  function onSingleSelectChange(value) {
    console.log(value, "value");
  }

	return (
		<div className='p-10'>
			<Card className=''>
				<p className='font-medium text-slate-600 m-4'>
					{pollInfo.title}
				</p>
				<div className='h-px w-full bg-slate-400	mb-6' />
				{pollInfo.isMulti ? (
					<MultiSelect options={pollInfo.options} />
				) : (
					<SingleSelect
						onSingleSelectChange={onSingleSelectChange}
						options={pollInfo.options || []}
					/>
				)}
				<Button className='bg-slate-600 text-white mx-6 mb-6'>
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
					className='font-medium text-slate-600 flex items-center space-x-2 mx-6 mb-6'>
					<RadioGroupItem value={option.value} id={option.id} />
					<Label htmlFor={option.id}>{option.name}</Label>
				</div>
			))}
			{/* {options} */}
		</RadioGroup>
	);
}

function MultiSelect({ options }) {
	return (
		<div>
			{options?.map((option) => (
				<div
					key={option.id}
					className='flex h-6 align-center font-medium text-slate-600 flex items-center space-x-2 mx-6 mb-6'>
					<Checkbox id='terms' />
					<Label htmlFor={option.id}>{option.value}</Label>
				</div>
			))}
		</div>
	);
}
