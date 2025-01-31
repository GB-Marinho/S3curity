var Html5QrcodeStrings = (function () {
    function Html5QrcodeStrings() {
    }
    Html5QrcodeStrings.codeParseError = function (exception) {
        return "Erro ao interpretar o código QR, erro = ".concat(exception);
    };
    Html5QrcodeStrings.errorGettingUserMedia = function (error) {
        return "Erro ao obter mídia do usuário, erro = ".concat(error);
    };
    Html5QrcodeStrings.onlyDeviceSupportedError = function () {
        return "O dispositivo não suporta navigator.mediaDevices, apenas "
            + "o parâmetro deviceId (string) é suportado neste caso.";
    };
    Html5QrcodeStrings.cameraStreamingNotSupported = function () {
        return "Transmissão de câmera não suportada pelo navegador.";
    };
    Html5QrcodeStrings.unableToQuerySupportedDevices = function () {
        return "Não foi possível consultar os dispositivos suportados, erro desconhecido.";
    };
    Html5QrcodeStrings.insecureContextCameraQueryError = function () {
        return "O acesso à câmera só é permitido em contextos seguros, como HTTPS "
            + "ou localhost.";
    };
    Html5QrcodeStrings.scannerPaused = function () {
        return "Scanner pausado";
    };
    return Html5QrcodeStrings;
}());
export { Html5QrcodeStrings };

var Html5QrcodeScannerStrings = (function () {
    function Html5QrcodeScannerStrings() {
    }
    Html5QrcodeScannerStrings.scanningStatus = function () {
        return "Escaneando";
    };
    Html5QrcodeScannerStrings.idleStatus = function () {
        return "Inativo";
    };
    Html5QrcodeScannerStrings.errorStatus = function () {
        return "Erro";
    };
    Html5QrcodeScannerStrings.permissionStatus = function () {
        return "Permissão";
    };
    Html5QrcodeScannerStrings.noCameraFoundErrorStatus = function () {
        return "Nenhuma câmera encontrada";
    };
    Html5QrcodeScannerStrings.lastMatch = function (decodedText) {
        return "Última correspondência: ".concat(decodedText);
    };
    Html5QrcodeScannerStrings.codeScannerTitle = function () {
        return "Scanner de Código";
    };
    Html5QrcodeScannerStrings.cameraPermissionTitle = function () {
        return "Solicitar permissão para câmera";
    };
    Html5QrcodeScannerStrings.cameraPermissionRequesting = function () {
        return "Solicitando permissões da câmera...";
    };
    Html5QrcodeScannerStrings.noCameraFound = function () {
        return "Nenhuma câmera encontrada";
    };
    Html5QrcodeScannerStrings.scanButtonStopScanningText = function () {
        return "Parar escaneamento";
    };
    Html5QrcodeScannerStrings.scanButtonStartScanningText = function () {
        return "Iniciar escaneamento";
    };
    Html5QrcodeScannerStrings.torchOnButton = function () {
        return "Ligar lanterna";
    };
    Html5QrcodeScannerStrings.torchOffButton = function () {
        return "Desligar lanterna";
    };
    Html5QrcodeScannerStrings.torchOnFailedMessage = function () {
        return "Falha ao ligar a lanterna";
    };
    Html5QrcodeScannerStrings.torchOffFailedMessage = function () {
        return "Falha ao desligar a lanterna";
    };
    Html5QrcodeScannerStrings.scanButtonScanningStarting = function () {
        return "Iniciando a câmera...";
    };
    Html5QrcodeScannerStrings.textIfCameraScanSelected = function () {
        return "Escanear um arquivo de imagem";
    };
    Html5QrcodeScannerStrings.textIfFileScanSelected = function () {
        return "Escanear usando a câmera diretamente";
    };
    Html5QrcodeScannerStrings.selectCamera = function () {
        return "Selecionar câmera";
    };
    Html5QrcodeScannerStrings.fileSelectionChooseImage = function () {
        return "Escolher imagem";
    };
    Html5QrcodeScannerStrings.fileSelectionChooseAnother = function () {
        return "Escolher outra";
    };
    Html5QrcodeScannerStrings.fileSelectionNoImageSelected = function () {
        return "Nenhuma imagem selecionada";
    };
    Html5QrcodeScannerStrings.anonymousCameraPrefix = function () {
        return "Câmera anônima";
    };
    Html5QrcodeScannerStrings.dragAndDropMessage = function () {
        return "Ou solte uma imagem para escanear";
    };
    Html5QrcodeScannerStrings.dragAndDropMessageOnlyImages = function () {
        return "Ou solte uma imagem para escanear (outros arquivos não são suportados)";
    };
    Html5QrcodeScannerStrings.zoom = function () {
        return "Zoom";
    };
    Html5QrcodeScannerStrings.loadingImage = function () {
        return "Carregando imagem...";
    };
    Html5QrcodeScannerStrings.cameraScanAltText = function () {
        return "Escaneamento baseado em câmera";
    };
    Html5QrcodeScannerStrings.fileScanAltText = function () {
        return "Escaneamento baseado em arquivo";
    };
    return Html5QrcodeScannerStrings;
}());
export { Html5QrcodeScannerStrings };

var LibraryInfoStrings = (function () {
    function LibraryInfoStrings() {
    }
    LibraryInfoStrings.poweredBy = function () {
        return "Desenvolvido por ";
    };
    LibraryInfoStrings.reportIssues = function () {
        return "Relatar problemas";
    };
    return LibraryInfoStrings;
}());
export { LibraryInfoStrings };
//# sourceMappingURL=strings.js.map