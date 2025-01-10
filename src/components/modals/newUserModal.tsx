import { IconPlus } from "@tabler/icons-react";
import ModalTrigger from "../ui/custom/buttons/modalTrigger";
import { Button } from "../ui/button";
import NewUsersForm from "../forms/users/users-form";

export default function NewUserModal() {
    return (
        <ModalTrigger
            trigger={
                <Button className="btn-primary text-white items-center gap-2">
                    <IconPlus />
                    Novo Usuário
                </Button>
            }
        >
            <NewUsersForm />
        </ModalTrigger>
    );
}
