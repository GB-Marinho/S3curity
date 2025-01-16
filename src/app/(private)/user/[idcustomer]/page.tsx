import UpdateUserForm from "@/components/forms/user/updateUser/updateUser-form";
import { Button } from "@/components/ui/button";
import { findUserID } from "@/services";
import { notFound } from "next/navigation";



export default async function UserIdPage({
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
          <div></div>
          <Button
            form="updateUserForm"
            type="submit"
            className=" btn-primary text-white px-8"
          >
            Salvar
          </Button>
        </div>
        <UpdateUserForm user={response} />
      </div>
    );

}