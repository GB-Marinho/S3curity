import UpdateCustomerForm from "@/components/forms/customers/updateCustomer/updateCustomer-form";
import UltimoLoginPainel from "@/components/reports/panels/ultimoLoginPainel";
import { Button } from "@/components/ui/button";
import { PATH_PAGE_MANAGE } from "@/lib";
import { findUserID } from "@/services";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CustomerIdPage({
  params,
}: {
  params: { idcustomer: string };
}) {
  const response = await findUserID(params.idcustomer);

  if (!response) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full gap-4 container">
      <div className="flex w-full justify-between">
        <Link href={PATH_PAGE_MANAGE}>
          <Button variant={"ghost"} className="gap-2">
            <IconChevronLeft />
            Voltar
          </Button>
        </Link>
        <Button
          form="upateCustomerForm"
          type="submit"
          className=" btn-primary text-white px-8"
        >
          Salvar
        </Button>
      </div>
      <UpdateCustomerForm customer={response} />
      <div className="flex items-center font-bold text-xl text-zinc-400 gap-2">
        Histórico de Login{" "}
        <span className="text-xs text-zinc-500">(ultimo login)</span>
      </div>
      <UltimoLoginPainel email={response.email} />
    </div>
  );
}
