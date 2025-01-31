/**
 * @fileoverview
 * Strings usadas por {@class Html5Qrcode} & {@class Html5QrcodeScanner}
 * 
 * @author mebjas <minhazav@gmail.com>
 * 
 * A palavra "QR Code" é uma marca registrada da DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 */

/**
 * Strings usadas em {@class Html5Qrcode}.
 * 
 * TODO(mebjas): Suporte à internacionalização.
 */
export class Html5QrcodeStrings {

    public static codeParseError(exception: any): string {
        return `Erro ao interpretar o código QR, erro = ${exception}`;
    }

    public static errorGettingUserMedia(error: any): string {
        return `Erro ao obter mídia do usuário, erro = ${error}`;
    }

    public static onlyDeviceSupportedError(): string {
        return "O dispositivo não suporta navigator.mediaDevices, apenas "
        + "o parâmetro deviceId (string) é suportado neste caso.";
    }

    public static cameraStreamingNotSupported(): string {
        return "Transmissão de câmera não suportada pelo navegador.";
    }

    public static unableToQuerySupportedDevices(): string {
        return "Não foi possível consultar os dispositivos suportados, erro desconhecido.";
    }

    public static insecureContextCameraQueryError(): string {
        return "O acesso à câmera só é permitido em contextos seguros, como HTTPS "
        + "ou localhost.";
    }

    public static scannerPaused(): string {
        return "Scanner pausado";
    }
}

/**
 * Strings usadas em {@class Html5QrcodeScanner}.
 * 
 * TODO(mebjas): Suporte à internacionalização.
 */
export class Html5QrcodeScannerStrings {

    public static scanningStatus(): string {
        return "Escaneando";
    }

    public static idleStatus(): string {
        return "Ocioso";
    }

    public static errorStatus(): string {
        return "Erro";
    }

    public static permissionStatus(): string {
        return "Permissão";
    }

    public static noCameraFoundErrorStatus(): string {
        return "Nenhuma câmera encontrada";
    }

    public static lastMatch(decodedText: string): string {
        return `Última correspondência: ${decodedText}`;
    }

    public static codeScannerTitle(): string {
        return "Scanner de Código";
    }

    public static cameraPermissionTitle(): string {
        return "Solicitar acesso à câmera";
    }

    public static cameraPermissionRequesting(): string {
        return "Solicitando permissões da câmera...";
    }

    public static noCameraFound(): string {
        return "Nenhuma câmera encontrada";
    }

    public static scanButtonStopScanningText(): string {
        return "Parar escaneamento";
    }

    public static scanButtonStartScanningText(): string {
        return "Iniciar escaneamento";
    }

    public static torchOnButton(): string {
        return "Ligar lanterna";
    }

    public static torchOffButton(): string {
        return "Desligar lanterna";
    }

    public static torchOnFailedMessage(): string {
        return "Falha ao ligar a lanterna";
    }

    public static torchOffFailedMessage(): string {
        return "Falha ao desligar a lanterna";
    }

    public static scanButtonScanningStarting(): string {
        return "Iniciando a câmera...";
    }

    /**
     * Texto para mostrar quando a opção de escaneamento por câmera estiver selecionada.
     * 
     * Isso será usado para alternar para o escaneamento baseado em arquivo.
     */
    public static textIfCameraScanSelected(): string {
        return "Escanear um arquivo de imagem";
    }

    /**
     * Texto para mostrar quando a opção de escaneamento por arquivo estiver selecionada.
     * 
     * Isso será usado para alternar para o escaneamento baseado em câmera.
     */
    public static textIfFileScanSelected(): string {
        return "Escanear usando a câmera diretamente";
    }

    public static selectCamera(): string {
        return "Selecionar câmera";
    }

    public static fileSelectionChooseImage(): string {
        return "Escolher imagem";
    }

    public static fileSelectionChooseAnother(): string {
        return "Escolher outra";
    }

    public static fileSelectionNoImageSelected(): string {
        return "Nenhuma imagem selecionada";
    }

    /** Prefixo a ser dado às câmeras anônimas. */
    public static anonymousCameraPrefix(): string {
        return "Câmera anônima";
    }

    public static dragAndDropMessage(): string {
        return "Ou solte uma imagem para escanear";
    }

    public static dragAndDropMessageOnlyImages(): string {
        return "Ou solte uma imagem para escanear (outros arquivos não são suportados)";
    }

    /** Valor para zoom. */
    public static zoom(): string {
        return "zoom";
    }

    public static loadingImage(): string {
        return "Carregando imagem...";
    }

    public static cameraScanAltText(): string {
        return "Escaneamento baseado em câmera";
    }

    public static fileScanAltText(): string {
        return "Escaneamento baseado em arquivo";
    }
}

/** Strings usadas em {@class LibraryInfoDiv} */
export class LibraryInfoStrings {

    public static poweredBy(): string {
        return "Desenvolvido por ";
    }

    public static reportIssues(): string {
        return "Relatar problemas";
    }
}
