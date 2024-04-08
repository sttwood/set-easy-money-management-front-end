import {authOptions} from "@/lib/authOptions";
import Authbar from "./components/Authbar"
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main>
      <Authbar />
      <p>HOME</p>
    </main>
  );
}
