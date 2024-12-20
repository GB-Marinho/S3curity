import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const CardNewUser = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="w-full max-w-[991px] text-white rounded-xl">
      <CardHeader className="bg-[#27272A] rounded-t-xl">
        <CardTitle className="text-center text-lg font-semibold">
          Criar Usuário
        </CardTitle>
      </CardHeader>
      <CardContent className=" flex items-center justify-center p-4">{children}</CardContent>
    </Card>
  );
};

export default CardNewUser;
