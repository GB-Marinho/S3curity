import { handleError } from "@/lib";
import {
  createTokenQrCodeLogin,
  deleteTokenQrCodeLogin,
  getTokenQrCodeLogin,
} from "@/services";
import { IconQrcode } from "@tabler/icons-react";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QrCodeSkeleton } from "../skeletons";
import { Button } from "../ui/button";
import ButtonCloseModal from "../ui/custom/buttons/buttonCloseModal";
import ModalTrigger from "../ui/custom/buttons/modalTrigger";
import CardModal from "../ui/custom/cards/cardModal";

interface ShowQrCodeLoginModalProps {
  email: string;
}

export default function ShowQrCodeLoginModal(props: ShowQrCodeLoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    async function getToken() {
      setIsLoading(true);
      try {
        const response = await getTokenQrCodeLogin(props.email);
        if (response.status === 200) {
          setToken(response.data.token);
        } else {
          const dataError = response.data as unknown as { message: string };
          toast.warning(dataError.message);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getToken();
  }, [props.email]);

  async function handleCreateQrCode() {
    setIsLoading(true);
    try {
      const response = await createTokenQrCodeLogin(props.email);
      if (response.status === 201) {
        setToken(response.data.token);
        toast.success("QrCode criado com sucesso");
      } else {
        const dataError = response.data as unknown as { message: string };
        toast.error(dataError.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteQrCode() {
    setIsLoading(true);
    try {
      const response = await deleteTokenQrCodeLogin(props.email);
      if (response.status === 204) {
        setToken(undefined);
        toast.success("QrCode removido com sucesso");
      } else {
        const dataError = response.data as unknown as { message: string };
        toast.error(dataError.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalTrigger
      trigger={
        <Button
          className="btn-primary text-white items-center gap-2"
          type="button"
        >
          <IconQrcode />
          Visualizar QrCode Login
        </Button>
      }
    >
      {(onclose) => (
        <CardModal title="Criar Usuário">
          <div className="flex flex-col gap-8 w-full items-center justify-center">
            <h2 className="text-lg">
              Salve seu QrCode em um local securo para realizar login sem senha,
              utilizando apenas este QrCode.
            </h2>
            {isLoading ? (
              <QrCodeSkeleton />
            ) : token ? (
              <QRCodeCanvas
                value={token || ""}
                title={props.email}
                size={300}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
                imageSettings={{
                  src: "@/assets/img/logo.png", // TODO: trocar pelo caminho no bucket
                  x: undefined,
                  y: undefined,
                  height: 20,
                  width: 20,
                  opacity: 1,
                  excavate: true,
                }}
              />
            ) : (
              <h3 className="text-center text-xl font-semibold italic h-[300px]">
                Usuário ainda não possui um QrCode para Login. Clique abaixo em
                Gerar Novo QrCode para obter um.
              </h3>
            )}
            <h4 className="text-zinc-400">
              Se caso suspeitar de perda ou roubo do QrCode, clique abaixo em
              Gerar Novo QrCode e o antigo QrCode não terá mais valide. Mas{" "}
              <span className="font-bold">
                atenção procedimento irreversível
              </span>
              .
            </h4>
            {/* <NewUsersForm onClose={onclose} /> */}
            <div className="w-full flex gap-12 justify-end">
              <ButtonCloseModal
                title="Fechar"
                resetForm={() => {
                  onclose();
                }}
              />
              {token ? (
                <Button
                  type="button"
                  className="btn-error text-white items-center gap-2 text-xl font-bold py-6"
                  disabled={isLoading}
                  onClick={handleDeleteQrCode}
                >
                  Excluir QrCode
                </Button>
              ) : null}
              <Button
                type="button"
                className="btn-primary text-white items-center gap-2 text-xl font-bold py-6"
                disabled={isLoading}
                onClick={handleCreateQrCode}
              >
                Gerar Novo QrCode
              </Button>
              {/* <ButtonSubmit form="newUserForm" /> */}
            </div>
          </div>
        </CardModal>
      )}
    </ModalTrigger>
  );
}
