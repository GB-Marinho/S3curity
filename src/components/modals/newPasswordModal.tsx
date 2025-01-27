import React from 'react'
import ModalTrigger from '../ui/custom/buttons/modalTrigger';
import { Button } from '../ui/button';
import CardModal from '../ui/custom/cards/cardModal';
import PasswordReplaceForm from '../forms/passwordReplaceForm/passwordReplaceForm';
import { IconLockCode } from '@tabler/icons-react';

export default function NewPasswordModal({ userID }: { userID: string }) {
    return (
        <ModalTrigger
          trigger={
            <Button className="items-center gap-2 bg-zinc-900 border-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-800 hover:text-white">
              <IconLockCode />
              Alterar Senha
            </Button>
          }
        >
          {(onclose) => (
            <CardModal title="Alterar Senha">
            <div className="flex flex-col gap-8">
              <PasswordReplaceForm userID={userID} onClose={onclose} />
            </div>
          </CardModal>
          )}
        </ModalTrigger>
      );
}
