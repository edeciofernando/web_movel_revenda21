import React from "react";

const LineDetail = (props) => {
//const LineDetail = ({id, modelo, marca, ano, preco, handleClick}) => {  
  return (
    <tr key={props.id} data-id={props.id} onClick={props.handleClick}>
      <td>{props.modelo}</td>
      <td>{props.marca}</td>
      <td>{props.ano}</td>
      <td>{props.preco}</td>
      <td>
        <i className="far fa-edit text-success mr-2" title="Alterar"></i>
        <i className="fas fa-minus-circle text-danger" title="Excluir"></i>
      </td>
    </tr>
  );
};

export default LineDetail;
