import React, { useState, useEffect, useRef } from 'react'
import FormHerbie from './FormHerbie';
import LineDetail from './LineDetail';
import SideHerbie from './SideHerbie';
import "./table.css";

const AppBody = () => {

  const [lista, setLista] = useState([]);
  const childRef = useRef();

  // "efeito colateral", ocorre quando a página é carregada
  useEffect(() => {
    setLista(localStorage.getItem("carros")
      ? JSON.parse(localStorage.getItem("carros"))
      : []);
  }, []); 

  const atualizaLista = (dados) => {
    setLista(dados);
  }

  const handleClick = e => {
    // obtém a linha da tabela sobre a qual o usuário clicou, ou seja, qual elemento tr foi clicado
    const tr = e.target.closest("tr");

    // console.log(e.target);
    // console.log(tr);
    // console.log(tr.getAttribute("data-id"));  
    
    const id = Number(tr.getAttribute("data-id"));
    
    if (e.target.classList.contains("fa-edit")) {      
      // console.log("Alterar");

      // atribui a cada variável do form, o conteúdo da linha clicada
      const carroAlt = {}
      carroAlt.modelo = tr.cells[0].innerText;
      carroAlt.marca = tr.cells[1].innerText;
      carroAlt.ano = tr.cells[2].innerText;
      carroAlt.preco = tr.cells[3].innerText;
      carroAlt.id = id;

      // executa um método no componente filho
      childRef.current.onLoadData(carroAlt);

    } else if (e.target.classList.contains("fa-minus-circle")) {
      // console.log("Excluir");

      // obtém o modelo da linha sobre a qual o usuário clicou
      const modelo = tr.cells[0].innerText;

      if (window.confirm(`Confirma a exclusão do veículo "${modelo}"?`)) {
        // aplica um filtro para recuperar todas as linhas, exceto aquela que será excluída
        const novaLista = lista.filter((carro) => {return carro.id !== id});

        // atualiza o localStorage
        localStorage.setItem("carros", JSON.stringify(novaLista));

        // atualiza a tabela (refresh)
        setLista(novaLista);
      }
    }
  }

  return (
    <div className="row">
      <SideHerbie />

      <div className="col-sm-9 mt-2">
        <FormHerbie atualiza={atualizaLista} lista={lista} ref={childRef}/>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Modelo do Veículo</th>
              <th>Marca</th>
              <th>Ano</th>
              <th>Preço R$</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((carro) => {
              carro.handleClick = handleClick;
              return (
                LineDetail(carro)
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppBody;