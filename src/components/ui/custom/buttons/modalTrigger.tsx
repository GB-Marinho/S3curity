"use client";
import React, {
  cloneElement,
  isValidElement,
  ReactNode,
  useState,
} from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../dialog";

interface ButtonDialogProps {
  trigger: ReactNode;
  children: ReactNode;
}

export default function ModalTrigger({
  children,
  trigger
}: ButtonDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
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
