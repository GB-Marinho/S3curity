import { LoginQrCodeForm } from "@/components/forms/loginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page({
  searchParams,
}: {
  searchParams: { next: string };
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-12 gap-8">
      <Card className="w-full sm:w-[350px]">
        <CardHeader>
          <CardTitle>Autenticação Por QrCode</CardTitle>
          <CardDescription>
            Aponte o Qr-Code para realizar o login
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex items-center justify-center h-full">
          <LoginQrCodeForm next={searchParams.next} />
        </CardContent>
      </Card>
    </div>
  );
}
