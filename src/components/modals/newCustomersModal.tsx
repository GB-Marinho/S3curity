"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import NewCustomerForm from "../forms/newCustomer/newCustomer-form";
import { Button } from "../ui/button";
import { IconPlus } from "@tabler/icons-react";

export default function NewCustomersModal() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary text-white items-center gap-2">
          <IconPlus className="h-5 w-5" />
          Novo usuário
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl p-0 border-none"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <NewCustomerForm onClose={closeModal} />
      </DialogContent>
    </Dialog>
  );
}
