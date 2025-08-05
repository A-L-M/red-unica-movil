import React from 'react';

import './Boton.scss';

interface Props {
  etiqueta?: string;
  onClick?(): void;
  submit?: boolean;
  deshabilitado?: boolean;
  estilo?: number;
}

const Boton = ({
  etiqueta = 'Continuar',
  onClick = () => {},
  submit = false,
  deshabilitado = false,
  estilo = 1,
}: Props) => {
  return (
    <button
      className={`boton estilo-${estilo}`}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={deshabilitado}
    >
      {etiqueta}
    </button>
  );
};

export default Boton;
