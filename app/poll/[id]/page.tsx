export default function PollId({ params }: { params: { id: string } }) {
  return <div className={""}>Poll {params.id}</div>;
}
