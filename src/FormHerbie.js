import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import DivMessageErrors from "./DivMessageErrors";

//const FormHerbie = ({ atualiza, lista }) => {
const FormHerbie = forwardRef(({ atualiza, lista }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [alterar, setAlterar] = useState(false);
  const [data_id, setData_id] = useState(0);

  const onSubmit = (data) => {
    // acrescenta um novo atributo aos dados enviados a partir do formulário
    data.id = new Date().getTime();
    console.log(data);

    // se houver dados salvos em localStorage, obtém esses dados (senão, vazio)
    const carros = localStorage.getItem("carros")
      ? JSON.parse(localStorage.getItem("carros"))
      : "";

    // salva em localstorage os dados existentes, acrescentando o preenchido no form
    localStorage.setItem("carros", JSON.stringify([...carros, data]));

    // atualiza a lista
    // setLista([...lista, data]);
    atualiza([...lista, data]);

    // pode-se limpar cada campo
    setValue("modelo", "");
    setValue("marca", "");
    setValue("ano", "");
    setValue("preco", "");

    // ou, então, limpar todo o form
    // contudo, esse reset() não limpa o conteúdo das variáveis (ou seja, se o usuário
    // clicar 2x sobre o adicionar, irá duplicar o registro)
    //    e.target.reset();
  };

  // método que é acionado pelo componente pai
  // para carregar os dados no form e indicar a alteração
  const onLoadData = (carro) => {
    // atribui a cada variável do form, o conteúdo da linha clicada
    setValue("modelo", carro.modelo);
    setValue("marca", carro.marca);
    setValue("ano", carro.ano);
    setValue("preco", carro.preco);

    setAlterar(true);
    setData_id(carro.id);
  };

  useImperativeHandle(ref, () => ({
    onLoadData
  }));

  const onUpdate = (data) => {
    // inicialmente, recupera os dados salvos em localStorage
    const carros = JSON.parse(localStorage.getItem("carros"));

    // cria um novo array vazio
    const carros2 = [];

    for (const carro of carros) {
      if (carro.id === data_id) {
        data.id = data_id;
        carros2.push(data); // os dados do form (alterados) + data.id
      } else {
        carros2.push(carro);
      }
    }

    // atualiza os dados em localStorage (com os dados de carros2)
    localStorage.setItem("carros", JSON.stringify(carros2));

    // atualiza a lista (para fazer um refresh na página)
    // setLista(carros2);
    atualiza(carros2);

    setValue("modelo", "");
    setValue("marca", "");
    setValue("ano", "");
    setValue("preco", "");

    setAlterar(false);
  };

  // obtém o ano atual
  const ano_atual = new Date().getFullYear();

  return (
    <form onSubmit={alterar ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Modelo:</span>
        </div>
        <input
          type="text"
          className="form-control"
          {...register("modelo", {
            required: true,
            minLength: 2,
            maxLength: 30,
          })}
          autoFocus
        />
        <div className="input-group-prepend">
          <span className="input-group-text">Marca:</span>
        </div>
        <select
          className="form-control"
          {...register("marca", {
            required: true,
          })}
        >
          <option value="">-- Selecione a Marca --</option>
          <option value="Chevrolet">Chevrolet</option>
          <option value="Fiat">Fiat</option>
          <option value="Ford">Ford</option>
          <option value="Renault">Renault</option>
          <option value="Volkswagen">Volkswagen</option>
        </select>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Ano:</span>
        </div>
        <input
          type="number"
          className="form-control"
          {...register("ano", {
            required: true,
            min: ano_atual - 30,
            max: ano_atual + 1,
          })}
        />
        <div className="input-group-prepend">
          <span className="input-group-text">Preço R$:</span>
        </div>
        <input
          type="number"
          className="form-control"
          {...register("preco", {
            required: true,
            min: 5000,
            max: 100000,
          })}
        />
        <div className="input-group-append">
          <input
            type="submit"
            className={alterar ? "d-none" : "btn btn-primary"}
            value="Adicionar"
          />
          <input
            type="submit"
            className={alterar ? "btn btn-success" : "d-none"}
            value="Alterar"
          />
        </div>
      </div>
      <DivMessageErrors errors={errors} ano_atual={ano_atual} />
    </form>
  );
});

export default FormHerbie;
