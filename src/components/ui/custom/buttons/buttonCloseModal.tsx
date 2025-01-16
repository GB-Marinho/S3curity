import React from 'react'
import { Button } from '../../button';

export default function ButtonCloseModal({ resetForm, title = "Cancelar" }: { resetForm: () => void, title?: string }) {
  return (
    <Button variant={'secondary'}
    onClick={(e) => {
      e.preventDefault();
      resetForm();
    }}
    className="w-full max-w-[206px] text-xl font-bold py-6"
  >
    {title}
  </Button>
  )
}
