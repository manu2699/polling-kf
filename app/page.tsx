import { redirect } from 'next/navigation'

export default async function Home() {
	redirect("/poll", "replace");
	return null;
}
