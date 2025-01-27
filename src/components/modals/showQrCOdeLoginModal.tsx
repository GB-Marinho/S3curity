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
  const [buildComplete, setBuildComplete] = useState(false);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    async function getToken() {
      setIsLoading(true);
      if (buildComplete) {
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
    }
    getToken();
  }, [props.email, buildComplete]);

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
          className="btn-secondary text-white items-center gap-2"
          type="button"
          onClick={() => setBuildComplete(true)}
        >
          <IconQrcode />
          QrCode Login
        </Button>
      }
    >
      {(onclose) => (
        <CardModal title="QrCode Login">
          <div className="flex flex-col gap-8 w-full items-center justify-center">
            {token && (
              <h2 className="">
                Salve seu QrCode em um local securo para realizar login sem
                senha, utilizando apenas este QrCode.
              </h2>
            )}

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
              <div className=" flex items-center  h-[300px] max-w-[75%]">
                <h3 className="text-center text-sm text-zinc-400 italic">
                  Este usuário ainda não possui um QrCode para Login. Clique
                  abaixo em
                  <span className="font-bold"> Novo QrCode </span>
                  para obter um.
                </h3>
              </div>
            )}
            {token && (
              <h4 className="text-zinc-400 text-justify">
                Se caso suspeitar de perda ou roubo do QrCode, clique abaixo em
                Gerar Novo QrCode e o antigo QrCode não terá mais valide. Mas{" "}
                <span className="font-bold">
                  atenção procedimento irreversível
                </span>
                .
              </h4>
            )}

            <div className="w-full flex gap-12 ">
              <ButtonCloseModal
                grow
                title="Fechar"
                resetForm={() => {
                  onclose();
                }}
              />
              {token ? (
                <Button
                  type="button"
                  className="btn-error text-white items-center gap-2 text-xl font-bold py-6 flex-grow"
                  disabled={isLoading}
                  onClick={handleDeleteQrCode}
                >
                  Excluir QrCode
                </Button>
              ) : null}
              <Button
                type="button"
                className="btn-primary text-white items-center gap-2 text-xl font-bold py-6 flex-grow"
                disabled={isLoading}
                onClick={handleCreateQrCode}
              >
                Novo QrCode
              </Button>
            </div>
          </div>
        </CardModal>
      )}
    </ModalTrigger>
  );
}
