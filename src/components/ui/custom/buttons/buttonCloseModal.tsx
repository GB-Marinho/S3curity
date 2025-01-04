import React from 'react'
import { Button } from '../../button';

export default function ButtonCloseModal({ resetForm, title = "Cancelar" }: { resetForm: () => void, title?: string }) {
  return (
    <Button
    onClick={(e) => {
      e.preventDefault();
      resetForm();
    }}
    className="w-full max-w-[206px] btn-secondary text-white text-xl font-bold py-6"
  >
    {title}
  </Button>
  )
}
