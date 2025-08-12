import React from 'react';

import './BotonTexto.scss';

interface Props {
  className?: string;
  etiqueta?: string;
  onClick?(): void;
  variacion?: number;
  estilo?: React.CSSProperties;
}

const BotonTexto = ({
  className,
  etiqueta,
  onClick,
  variacion = 1,
  estilo,
}: Props) => {
  return (
    <button
      className={className ?? `LRUM-boton-texto variacion-${variacion}`}
      type="button"
      onClick={onClick}
      style={estilo}
    >
      {etiqueta}
    </button>
  );
};

export default BotonTexto;
