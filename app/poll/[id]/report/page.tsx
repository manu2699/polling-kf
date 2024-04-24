"use client"

import React, { useMemo } from 'react';
import { BarChart } from '@tremor/react';
import { POLL_LIST } from '../../mock';

export default function PollResult({index}){

  const pollData = useMemo(function getPollData(){
         return POLL_LIST[0].options.reduce((acc, data)=>{ 
          return [{item:data.value , votes: 900 }, ...acc]
     },[])
  },[])
  
  return(

  <div className='flex align-middle justify-center h-screen w-full'>
    <BarChart
    className="mt-4 h-72 w-1/4"
    data={pollData}
    index="item"
    categories={['votes']}
    colors={['blue']}
    // valueFormatter={dataFormatter}
    yAxisWidth={48}
    onValueChange={(v) => console.log(v)}
  />
</div>
  )
}