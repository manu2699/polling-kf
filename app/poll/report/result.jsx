import React, { useMemo } from 'react';
import { BarChart } from '@tremor/react';
import { POLL_LIST } from '../mock';

export function PollResult(index){

  const pollData = useMemo(function getPollData(){
         return POLL_LIST[index].options.reduce((acc, data)=>{ 
          return [{item:data.value , votes: data.voters.length }, ...acc]
     },[])
  },[])
  
  return(
    <BarChart
    data={pollData}
    index="item"
    categories={['votes']}
    colors={['blue']}
    // valueFormatter={dataFormatter}
    yAxisWidth={48}
    onValueChange={(v) => console.log(v)}
  />

  )
}