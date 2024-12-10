import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Logo from "@/assets/img/logo.png"
import { IconMail, IconEye, IconBrandGoogleFilled } from "@tabler/icons-react"

export function LoginForm() {
    return (
        <Card className="mx-auto bg-[#18181B] border-none text-white w-[631px]">
            <CardHeader >
                <div className="w-full flex flex-col justify-center items-center gap-8">
                    <Image src={Logo} alt="Logo" width={90} />
                    <CardTitle className="text-2xl">Entre com sua conta</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="input flex items-center">
                            <Input
                                id="email"
                                type="email"
                                required
                                className="bg-transparent border-none flex-1"
                            />
                            <IconMail className="mx-2" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Senha</Label>
                        </div>
                        <div className="input flex items-center">
                            <Input id="password"
                                type="password"
                                required
                                className="bg-transparent border-none flex-1"
                            />
                            <IconEye className="mx-2" />
                        </div>
                        <Link href="#" className="ml-auto inline-block text-sm text-zinc-500">
                            Esqueceu a senha?
                        </Link>
                    </div>
                    <Button type="submit" className="w-full btn-primary">
                        Login
                    </Button>
                    <div className="flex items-center">
                        <div className="flex-grow">
                            <hr className="border-t border-zinc-800" />
                        </div>
                        <span className="px-2 text-zinc-500">ou</span>
                        <div className="flex-grow">
                            <hr className="border-t border-zinc-800" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <Button variant="outline" className="flex w-[50px] h-[50px] bg-red-600 border-none rounded-full">
                            {/* Tamanho da letra do SVG */}
                            <IconBrandGoogleFilled  style={{ width: '24px', height: '24px' }}/>
                        </Button>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm">
                    <span>
                        Ainda não possui conta?{" "}
                        <Link href="#" className="underline text-green-500">
                            Cadastre-se aqui
                        </Link>
                    </span>
                    <br />
                    <span className="text-zinc-700">
                        ou faça login pelo Google clicando no G acima.
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}