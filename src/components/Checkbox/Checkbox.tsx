import React from 'react';

import './Checkbox.scss';

interface Props {
  mensaje?: string;
  id?: string;
  nombre?: string;
  valor?: boolean;
  controlador?(): void;
  deshabilitado: boolean;
  estilo?: React.CSSProperties;
}

const Checkbox = ({
  mensaje,
  id,
  nombre = '',
  valor,
  controlador,
  deshabilitado = false,
  estilo,
}: Props) => {
  return (
    <div className="LRUM-checkbox" style={estilo}>
      <input
        className={deshabilitado ? 'deshabilitar' : ''}
        type="checkbox"
        name={nombre}
        id={id}
        value={nombre}
        checked={valor}
        onChange={controlador}
        disabled={deshabilitado}
      />
      <label
        className={`texto ${deshabilitado ? 'deshabilitar' : ''}`}
        htmlFor={id}
      >
        {mensaje}
      </label>
    </div>
  );
};

export default Checkbox;
