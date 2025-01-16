import UpdateCustomerForm from "@/components/forms/customers/updateCustomer/updateCustomer-form";
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
    const response = await findUserID(params.idcustomer)
    
    if(!response) {
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
      </div>
    );

}