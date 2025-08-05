import React from 'react';
import './Boton.scss';
interface Props {
    etiqueta: string;
    onClick(): void;
    submit: boolean;
    deshabilitar: boolean;
    estilo: number;
}
declare const Boton: ({ etiqueta, onClick, submit, deshabilitar, estilo, }: Props) => React.JSX.Element;
export default Boton;
