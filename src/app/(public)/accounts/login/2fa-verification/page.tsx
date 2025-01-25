import { OtpForm } from "@/components/forms/loginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page({
  searchParams,
}: {
  searchParams: { email: string; next: string };
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-12 gap-8">
      <Card className="w-full sm:w-[350px]">
        <CardHeader>
          <CardTitle>Autenticação 2 Fatores</CardTitle>
          <CardDescription>{searchParams.email}</CardDescription>
        </CardHeader>
        <CardContent className="w-full flex items-center justify-center h-full">
          <OtpForm next={searchParams.next} email={searchParams.email} />
        </CardContent>
      </Card>
    </div>
  );
}
