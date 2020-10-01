import React from "react";
import _Pages from "../_Page";
import {
  Tabs,
  Avatar,
  Form,
  Tooltip
} from "antd";
import Header from "../../components/Header";
import "./styles.css";
import PropyTypes from 'prop-types'
import { Link,} from "react-router-dom";
import layout from '../../assets/img/layout.png'
import place from '../../assets/img/place.png'
import time from '../../assets/img/time.png'
import frete from '../../assets/img/frete.png'
import add from '../../assets/img/add.png'
import list from '../../assets/img/list.png'
import orderService from '../../services/PedidoService'

class Admin extends _Pages {
  
  static PropyTypes = {
    form: PropyTypes.any.isRequired
  }
  state={
    order: []
  }
  componentDidMount() {
    super.componentDidMount();
    orderService.getAll().then(response => {
      this.update({ order: response.data })      
    })
    
    
  }

  onChange = checked => {
    this.setState({ loading: !checked });
  };
  render() {
    const {order} = this.state
    console.log(order)
    const { TabPane } = Tabs
    return (
      <>
        <Header />
        <div id="bodyAdm">
          <Tabs defaultActiveKey="1">
            <TabPane tab={<h2>Informações</h2>} key="1">
              <div id="Edit">   
             
      <Tooltip placement="bottom" title=' Editar Painel da loja'>       
          <Link 
             to="StoreInfo/1"
            >
                <Avatar shape="square" size="large" src={layout} alt="Minha Figura" />	                
            </Link>
          </Tooltip> 
          <Tooltip placement="bottom" title=' Editar Horarios de Funcionamento'>
            <Link 
             to="StoreTime/1"
            >
                   <Avatar shape="square" size="large" src={time} alt="Minha Figura" />
            </Link>            
            </Tooltip>
            <Tooltip placement="bottom" title=' Editar Endereço da loja'>
            <Link to="StoreAddress/1">
            <Avatar shape="square" size="large" src={place} alt="Minha Figura" />
            </Link>
            </Tooltip>  
            <Tooltip placement="bottom" title='Editar valores de frete'>
            <Link 
             to="StoreDelivery/1"
            >
                   <Avatar shape="square" size="large" src={frete} alt="Minha Figura" />
            </Link>
            </Tooltip>
            </div> 
            </TabPane>
            <TabPane tab={<h2>Historico de Pedidos</h2>} key="3">
              {order ? 
              order.map(pedido =>{return(
                <div style={{border: 'solid'}}>
                  
                  <h3>Nome:{pedido.nome}</h3>
                  <h5>Telefone:{pedido.telefone}</h5>
                  <h5>Endereço:{pedido.endereco}</h5>
                  <h5>N°:{pedido.numero}</h5>
                  <h5>Complemento:{pedido.complemento}</h5>
                  <p>Pedido:{pedido.array}</p>
                  <p>Observações:{pedido.descricao}</p>
                  <p>Forma de Pagamento:{pedido.pagamento}</p>
                  <p>Total da Compra:{parseFloat(pedido.compra_total) + parseFloat(pedido.frete) }</p>
                </div>
              )}
                
              ) : <p>Sem Pedidos</p>
            
              }
              
            </TabPane>
            <TabPane tab={<h2> Novo Produto</h2>} key="4">
              <div id='Edit'>
              <Tooltip placement="bottom" title=' Criar novo Produto'>
            <Link 
             to="CreateProductGroup"
            >
                   <Avatar shape="square" size="large" src={add} alt="Minha Figura" />
            </Link>
            </Tooltip>
            <Tooltip placement="bottom" title=' Lista de Produto'>
            <Link 
             to="ListProduct"
            >
                   <Avatar shape="square" size="large" src={list} alt="Minha Figura" />
            </Link>
            </Tooltip>            
                
              </div>
            </TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}
export default Form.create({name: "AdminForm"}) (Admin)
