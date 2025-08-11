import React from 'react';

import './Boton.scss';

interface Props {
  className?: string;
  etiqueta?: string;
  onClick?(): void;
  submit?: boolean;
  deshabilitado?: boolean;
  variacion?: number;
  estilo?: React.CSSProperties;
}

const Boton = ({
  className = '',
  etiqueta = 'Continuar',
  onClick = () => {},
  submit = false,
  deshabilitado = false,
  variacion = 1,
  estilo,
}: Props) => {
  return (
    <button
      className={className ?? `boton variacion-${variacion}`}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={deshabilitado}
      style={estilo}
    >
      {etiqueta}
    </button>
  );
};

export default Boton;
