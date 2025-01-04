import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardLogin from "@/components/ui/custom/cards/cardLogin";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/img/logo.png";
import Logotipo from "@/assets/img/logotipo.png";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <CardLogin>
        <CardHeader>
          <div className="w-full flex flex-col justify-center items-center gap-8">
            <div className="flex flex-col gap-3">
              <Image src={Logo} alt="Logo" width={90} />
              <Image src={Logotipo} alt="Logotipo" width={90} />
            </div>
            <CardTitle className="text-2xl">Entre com sua conta</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-gray-300 mb-6 text-center">
            Estamos felizes em tê-lo aqui. Clique no botão abaixo para entrar no
            sistema.
          </p>
          <Button
            type="submit"
            asChild
            className="w-full btn-primary text-white text-xl py-6"
          >
            <Link href="accounts/login">LOGIN</Link>
          </Button>
          <Button
            type="button"
            asChild
            className="w-full btn-secondary text-white text-xl py-6"
          >
            <Link href="home">ACESSAR</Link>
          </Button>
        </CardContent>
      </CardLogin>
    </div>
  );
}
