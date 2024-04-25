import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import Poll from "@/components/poll/index";

export default function Home() {
  async function handleSubmit(data: any) {
    "use server";

    console.log("dt submit", data);

    const userCookie = cookies().get("userId");
    console.log("cookies", userCookie);

    const supabase = createClient();

    const { data: pollData, error } = await supabase
      .from("poll")
      .insert({
        title: data.title,
        isMultiple: data.isMultiple,
        createdBy: userCookie?.value || "",
      })
      .select();

    if (error) {
      // throw new Error(error.message)
      return error;
    }

    // console.log("pollData", pollData);

    redirect("/");
  }
  return (
    <div>
      <Poll onSubmit={handleSubmit} />
    </div>
  );
}
