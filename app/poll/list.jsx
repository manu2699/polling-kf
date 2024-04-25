"use client";

import { Card } from "@/components/ui/card";

export function PollsList({ pollsList, myPoll = false, onItemClick }) {
	function handleItemClick(id) {
		onItemClick({ id });
	}
	return (
		<Card className='mb-4'>
			{pollsList.map((pollInfo) => (
				<div
					className='p-5 flex items-center justify-between border-b-2	hover:bg-slate-100 cursor-pointer'
					key={pollInfo.id}
					onClick={() => handleItemClick(pollInfo.id)}>
					<span className='text-sm font-medium text-slate-600'>
						{pollInfo.title}
					</span>
					{/* {myPoll && (
						<Button
							className='text-blue-600 text-sm font-medium'
							variant='secondary'
							size='medium'>
							view report
						</Button>
					)} */}
				</div>
			))}
		</Card>
	);
}

export function Title({ children }) {
	return (
		<div className='mb-4 text-base font-medium border-cyan-800 text-slate-800'>
			{children}
		</div>
	);
}
