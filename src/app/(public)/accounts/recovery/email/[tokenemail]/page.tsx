import PasswordRecoveryEmailForm from "@/components/forms/passwordRecoveryEmailForm/passwordRecoveryEmailForm";
import { verifyEmailToken } from "@/services";
import { notFound } from "next/navigation";

export default async function RecoveryByEmailToken({
  params,
}: {
  params: { tokenemail: string };
}) {
  const response = await verifyEmailToken(params.tokenemail);
  if (response.status === 200 && response.data.isValid)
    // TODO: Criar o Form de Recuperar a senha se entrar nesse if
    return (
      <section>
        <PasswordRecoveryEmailForm token={params.tokenemail} />
      </section>
    );

  notFound();
}