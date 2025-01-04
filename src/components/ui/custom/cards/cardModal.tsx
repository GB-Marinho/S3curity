import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";

interface CardModalProps {
  children: ReactNode;
  title?: string;
}

const CardModal = (props: CardModalProps) => {
  return (
    <Card className="w-full max-w-[991px] text-white rounded-xl">
      <CardHeader className="bg-[#27272A] rounded-t-xl">
        <CardTitle className="text-center text-lg font-semibold">
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent className=" flex items-center justify-center p-4">
        {props.children}
      </CardContent>
    </Card>
  );
};

export default CardModal;
