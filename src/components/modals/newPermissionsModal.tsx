import { IconPlus } from "@tabler/icons-react";

import ModalTrigger from "../ui/custom/buttons/modalTrigger";
import { Button } from "../ui/button";
import PermissionsForm from "../forms/permissions/Permissions-form";

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
      <PermissionsForm />
    </ModalTrigger>
  );
}
