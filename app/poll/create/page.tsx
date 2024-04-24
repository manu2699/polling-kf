import Poll from "@/components/poll";

export default function Home() {
  return (
    <div className="bg-slate-100">
      <Poll isPollCreation={true} />
    </div>
  );
}
