"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconProgressCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function RecoverySuccessPage() {

    const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="flex flex-col py-4 sm:px-6 bg-[#18181B] border-none max-w-[500px]">
        <CardHeader className="flex flex-col justify-center items-center gap-4">
          <IconProgressCheck
            width="90px"
            height="90px"
            className="text-green-500"
          />
          <CardTitle className="text-2xl font-semibold text-gray-200">
            E-mail enviado com sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-300 mb-6">
            Verifique sua caixa de entrada. Enviamos um link para recuperação de
            senha. Caso não encontre, verifique a pasta de spam.
            </p>
            <div>
            <Button
              className="btn-primary text-white p-4 w-full"
              onClick={() => router.push("/accounts/login")}
            >
              Voltar para o Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
