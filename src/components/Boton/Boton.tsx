import React from 'react';

import './Boton.scss';

interface Props {
  etiqueta: string;
  onClick(): void;
  submit: boolean;
  deshabilitar: boolean;
  estilo: number;
}

const Boton = ({
  etiqueta = 'Continuar',
  onClick,
  submit = false,
  deshabilitar = false,
  estilo = 1,
}: Props) => {
  return (
    <button
      className={`boton estilo-${estilo}`}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={deshabilitar}
    >
      {etiqueta}
    </button>
  );
};

export default Boton;
