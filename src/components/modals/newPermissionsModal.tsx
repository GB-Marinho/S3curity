import { IconPlus } from "@tabler/icons-react";
import ButtonDialog from "../ui/custom/buttons/buttonDialog";
import NewPermissionsForm from "../forms/newPermissions/newPermissions-form";


export default function NewPermissionsModal() {
  return (
    <ButtonDialog title="Nova Permissão" icon={<IconPlus />}>
      <NewPermissionsForm />
    </ButtonDialog>
  );
}
