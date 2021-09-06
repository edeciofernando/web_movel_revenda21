import React from 'react';

const DivMessageErrors = ({errors}, ano_atual) => {
  return (
    <div
    className={
      (errors.modelo || errors.marca || errors.ano || errors.preco) &&
      "alert alert-danger"
    }
  >
    {errors.modelo && (
      <span>Modelo deve ser preenchido (até 30 caracteres); </span>
    )}
    {errors.marca && <span>Marca deve ser selecionada; </span>}
    {errors.ano && (
      <span>
        Ano deve ser preenchido (entre {ano_atual - 30} e {ano_atual + 1}
        );
      </span>
    )}
    {errors.preco && (
      <span>Preço deve ser preenchido (entre 5000 e 100000); </span>
    )}
  </div>
  );
}

export default DivMessageErrors;