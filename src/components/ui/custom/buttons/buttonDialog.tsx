"use client";
import React, {
  cloneElement,
  isValidElement,
  ReactNode,
  useState,
} from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../dialog";
import { Button } from "../../button";

interface ButtonDialogProps {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
}

export default function ButtonDialog({
  children,
  title,
  icon,
}: ButtonDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary text-white items-center gap-2">
          {icon}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl p-0 border-none"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        {isValidElement<{ onClose: () => void }>(children)
          ? cloneElement(children, { onClose: closeModal })
          : children}
      </DialogContent>
    </Dialog>
  );
}
