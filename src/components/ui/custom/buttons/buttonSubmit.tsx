import React from "react";
import { Button } from "../../button";
import { Loader2 } from "lucide-react";

export default function ButtonSubmit({
  title = "Salvar",
  isSubmitting = false,
}: {
  title?: string;
  isSubmitting?: boolean;
}) {
  return (
    <Button
      type="submit"
      className="w-full max-w-[206px] btn-primary text-white text-xl font-bold py-6"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" />
          salvando...
        </>
      ) : (
        title
      )}
    </Button>
  );
}
