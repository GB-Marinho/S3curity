import NewCustomerForm from "../forms/newCustomer/newCustomer-form";
import { IconPlus } from "@tabler/icons-react";
import ButtonDialog from "../ui/custom/buttons/buttonDialog";

export default function NewCustomersModal() {
  return (
    <ButtonDialog title="Novo usuário" icon={<IconPlus />}>
      <NewCustomerForm />
    </ButtonDialog>
  );
}
