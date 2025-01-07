import { IconPlus } from "@tabler/icons-react";
import ButtonDialog from "../ui/custom/buttons/modalTrigger";
import NewPermissionsForm from "../forms/Permissions/Permissions-form";
import ModalTrigger from "../ui/custom/buttons/modalTrigger";
import { Button } from "../ui/button";

export default function NewPermissionsModal() {
  return (
    <ModalTrigger
      trigger={
        <Button className="btn-primary text-white items-center gap-2">
          <IconPlus />
          Nova Permissão
        </Button>
      }
    >
      <NewPermissionsForm />
    </ModalTrigger>
  );
}
