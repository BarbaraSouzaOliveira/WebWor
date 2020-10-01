import React from 'react'
import {Input, Icon, Tabs, Button} from 'antd'
import  Header from '../../components/Header'
import Service from '../../services/UsuarioService'
import './styles.css'
import _Page from '../_Page'
import orderService from '../../services/PedidoService'

class User extends _Page{
  state={
    model:{},
    order: []
  }
  componentDidMount() {
    super.componentDidMount();
    Service.meusDados().then(response => {
      this.update({ model: response.data })      
    })
    orderService.getAll().then(response => {
      this.update({ order: response.data })      
    })
    
    
  }
    render(){
        const {TabPane} = Tabs
        const {model, order} = this.state
        console.log(this.state.model)
        return(
            <>  <Header/>
                <div id="bodyUser">
                <Tabs defaultActiveKey="1">
                <TabPane tab={<h2>Informações</h2>} key='1'>
                    <h4>Nome:</h4>
                    <Input disabled="true" placeholder="Nome" value={model.nome}prefix={<Icon type="user"/>}/>
                    <h4>CPF:</h4>
                    <Input disabled="true" value={model.cpf} placeholder="CPF" />
                    <h4>Telefone:</h4>
                    <Input disabled="true" placeholder="Telefone" value={model.telefone} prefix={<Icon type="phone"/>}/>
                    <h4>Telefone Secundario</h4>
                    <Input disabled="true" placeholder="Telefone" value={model.telefone_secundario} prefix={<Icon type="phone"/>}/>
                    <h4>Endereço</h4>
                    <Input disabled="true" placeholder="Endereço" value={model.endereco} prefix={<Icon type="home"/>}/>
                    <h4>Complemento</h4>
                    <Input disabled="true" placeholder="Endereço" value={model.complemento} prefix={<Icon type="home"/>}/>
                    <h4>Número</h4>
                    <Input disabled="true" placeholder="Endereço" value={model.numero} />
                </TabPane>
                <TabPane tab={<h2>Historico de Pedidos</h2>} key='3'>
                {order ? 
                
              order.filter(e => e.telefone === model.telefone).map(pedido =>{return(
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
              </Tabs>
                    
                </div>
            </>
        )
    }
}export default User