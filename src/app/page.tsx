import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-8">
      Rotas (Temporario)
      <div className="flex justify-center items-center gap-8">
        <Link href={"/accounts/login"}>
          <Button>Accounts</Button>
        </Link>
        <Link href={"/home"}>
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
}
