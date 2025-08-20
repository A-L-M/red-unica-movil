import React from 'react';

import Exclamacion from '../../../recursos/iconos/exclamacion.svg';

import './CampoTexto.scss';

interface Props {
  tipo?: string;
  nombre?: string;
  etiqueta?: string;
  valor?: string;
  controlador?(e: React.ChangeEvent<HTMLInputElement>): void;
  prefijo?: string;
  max?: number;
  textoAyuda?: string;
  patronRegex?: string;
  requerido?: boolean;
  error?: string;
  deshabilitado: boolean;
}

const CampoTexto = ({
  tipo = 'text',
  nombre,
  etiqueta = '',
  valor = '',
  controlador = () => {},
  prefijo,
  max,
  textoAyuda = '',
  patronRegex,
  requerido = false,
  error = '',
  deshabilitado = false,
}: Props) => {
  const validar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorLocal = e.target.value;
    //* Validar tipo de entrada
    if (tipo === 'number') {
      const esNumero = valorLocal.match(/^\d*$/);
      if (!esNumero) return;
    }

    if (tipo === 'tel') {
      const esTelefono = valorLocal.match(/^[\d-]*$/);
      if (!esTelefono) return;
    }

    //* Validar longitud maxima
    if (max && valorLocal.length > max) {
      return;
    }

    //* Validar patron Regex
    if (patronRegex) {
      const regex = new RegExp(patronRegex, 'u');
      const match = valorLocal.match(regex);
      if (!match) return;
    }

    controlador(e);
  };

  // Si es un telefono eliminar mascara
  const contador =
    tipo === 'tel' ? valor.replace(/\D/g, '').length : valor.length;

  // Si es un telefono tomar como maximo 10 digitos
  const maximo = tipo === 'tel' ? 10 : max;

  return (
    <div className="LRUM-campo-texto">
      <div className="grupo-input">
        <input
          className={`${prefijo ? 'padding-prefijo' : ''} ${error ? 'error' : ''} ${deshabilitado ? 'deshabilitado' : ''}`}
          type={tipo}
          id={nombre}
          name={nombre}
          //* Se usa un placeholder vacio para reglas de CSS
          placeholder=" "
          value={valor}
          onChange={validar}
          required={requerido}
          disabled={deshabilitado}
          max={max}
        />
        {prefijo && (
          <span className={`prefijo ${deshabilitado ? 'deshabilitado' : ''}`}>
            {prefijo}
          </span>
        )}
        {error && <img alt="Alerta" src={Exclamacion} />}
        <label htmlFor={nombre}>
          {etiqueta}
          {requerido && <span className="requerido"> *</span>}
        </label>
      </div>
      <div className={`grupo-ayuda ${error ? 'error' : ''}`}>
        <p>{error || textoAyuda}</p>
        {maximo && <p>{`${contador}/${maximo}`}</p>}
      </div>
    </div>
  );
};

export default CampoTexto;
