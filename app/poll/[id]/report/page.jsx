import { createClient } from "@/utils/supabase/server";

async function getData(pollId){
  const supabase = createClient();

  const { data: pollData } = await supabase
  .from("poll")
  .select()
  .eq("id", pollId);

}
export default function PollId({ params }) {
  return <div className={""}>Poll report</div>;
}
