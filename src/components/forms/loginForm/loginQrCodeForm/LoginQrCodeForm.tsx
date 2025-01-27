"use client";
import Html5QrcodePlugin from "@/components/QrCodePlugin/Html5QrcodePlugin";

export function LoginQrCodeForm() {
  const onNewScanResult = (decodedText, decodedResult) => {
    // handle decoded results here
    console.log("decodeText", decodedText);
    console.log("decodeResult", decodedResult);
  };

  return (
    <div className="w-full flex justify-center">
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
}
