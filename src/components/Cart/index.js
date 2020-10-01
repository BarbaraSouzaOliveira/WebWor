import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ActionTypes from '../../actions/actionTypes'
import Item from '../../components/Item'
import { Button, Modal, Card, notification, Checkbox, Input, Select } from 'antd'
import _Page from '../../pages/_Page'
import storeService from '../../services/PainelLojaService'
import PaypalExpressBtn from 'react-paypal-express-checkout'  
import service from '../../services/UsuarioService'
import orderService from '../../services/PedidoService'
class Cart extends _Page{
    state={
      pedido:{},
        model: {
          obs_para_pagamento: "PayPal",
          descricao: "nenhuma",
          pagamento: "Desconto fidelidade: "
        },
        total: 0,
        visible: false,
        usuario: {},
        isNew: false,
        painel: [],
        ponto: false,
        retirada: false,
        paypal: false,
        entrega: false,
        descontoPontos: 0
    }
    static propTypes = {
        produtos: PropTypes.any.isRequired
    }
    componentDidMount() {
      super.componentDidMount();
      service.meusDados().then(response => {
        this.update({ usuario: response.data })      
      })
      storeService.get(3).then(response => {
        this.update({ painel: response.data })
      })
      
    }
    openModal = () => {
        this.setState({
          visible: true,
        })
        this.calculateTotal(this.props.produtos)
      }
    
      cancel = e => {
        this.setState({
          visible: false,
        })
      }
       calculateTotal(itemList){
        let total = 0
        itemList.forEach(item => {
            total += parseFloat(item.preco).toFixed(2) * item.qtd
        })
        this.setState({total: total})
    }
  
    ganhaPontos(N, U , G, isD){      
      var newTotal = this.state.total
      var x = Math.floor(newTotal/N)
      var y = G*x
      if(+isD === 0){
        this.setPontos(this.state.usuario, parseInt(U)+parseInt(y))
      }else{
        this.setPontos(this.state.usuario, parseInt(U)+parseInt(y)-parseInt(isD))
      }
      
    }

    descontaPontos(U, R, D, flag){
       if(U < R || !flag ){
         return 0 
       }
       if(U> this.state.total){
        //this.setPontos(this.state.usuario, +U -this.state.total)
        return this.state.total
       }
       var y = Math.floor(U/R)
       var sobra = U- (y*R)
       //this.setPontos(this.state.usuario, +U - sobra)     
       return y*D
    }


    setPontos(usuario, pontos){
      usuario.pontos = pontos
      service.update( usuario.id_usuario , usuario).then(response => {
      console.log('sucesso')
    })
    }
  

    render(){   
      const { Option } = Select
      const {TextArea} = Input
      const {usuario, total, isNew, model, painel, ponto, entrega, retirada, paypal} =  this.state
      var {produtos , frete, pontosU, pontosG, 
      pontosN, pontosD, pontosR, isOpen, isRetirada,
      isPaypal, isEntrega }= this.props
      console.log(usuario)
      const onSuccess = (payment) => {
        console.log("The payment was succeeded!", payment) 
        if(this.state.retirada){
          frete = 0
        }       
        var array = produtos.map(e => e.qtd+'-'+e.titulo).join(' ')
        var pedido = Object.assign({},this.state.pedido)
        pedido.compra_total = parseFloat(total)
        pedido.array = array
        pedido.frete = parseFloat(frete)
        pedido.nome = usuario.nome
        pedido.telefone = usuario.telefone
        pedido.endereco = usuario.endereco
        pedido.numero = usuario.numero
        pedido.complemento = usuario.complemento
        pedido.pagamento= model.pagamento + this.descontaPontos(pontosU,pontosR,pontosD, this.state.ponto)
        pedido.obs_para_pagamento = model.obs_para_pagamento
        pedido.descricao = model.descricao
        orderService.save(pedido, "id_pedido").then(response => {
          this.update({ pedido: response.data })
          notification.open({
            message: "Sucesso!",
            description: "Sua compra foi realizada com sucesso, logo entregaremos"
          })
          this.setState({visible: false})
          this.ganhaPontos(pontosN,pontosU,pontosG,this.descontaPontos(pontosU,pontosR,pontosD, this.state.ponto))
          
          
        })
    }

    const onCancel = (data) => {
        notification.open({
          message: "Cancelado",
          description: "Voce cancelou o pagamento"
        })       
    }

    const onError = (err) => {
        notification.open({
          message: "Erro!",
          description: "Algo deu errado, tente novamente"
        })
    }
    const client = {
        sandbox:    'Af8pAKKiajNKk0DtBYxf7ph17i528BdnbRdSd36olposA07VbDqsqKkKRt4dAxtO68Z-Iyf_PXHeTig5',
        production: 'ENiMAupmnWdnJyx3EZCEDC5fE6JGgXHRFp1PgcTwONJYbC8ccAdn0awPLPSLxhXiI8L4x8crA5O9Cse3',
    }       
    
    if(produtos.length === 0){
        return(
            <>            
            <h3>Seu carrinho esta vazio</h3>
            <h1>:(</h1>          
      </>
        )
    }
        return(
           <>
           {
           produtos.map(pdt=>{return(
               <>
               <Item
               name={pdt.titulo}
               value={pdt.preco}
               id={pdt.id}
               amount={pdt.qtd}
               cart={true}
             />
             
             </>
           )})}
           {( isOpen && frete!== -1 ) ? 
            <Button 
            onClick={this.openModal}
           >Finalizar
           </Button> 
           
           :
           ( frete === -1) ? 
           <Button 
            disabled
            onClick={this.openModal}
           >Distancia não Aceita
           </Button> 
           :
            <Button 
            disabled
            onClick={this.openModal}
           >Restaurante fechado
           </Button> 
           
          }
          

            <Modal
                title="Carrinho de Compras"
                visible={this.state.visible}
                onCancel={this.cancel}
                footer={null}
            >
                {produtos.map(pdt => {
                    return(
                        <Card>
                        <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <h3 style={{fontSize:17, color: 'red'}}> {pdt.qtd} </h3> 
                            <h3 style={{color: 'black'}}>{pdt.titulo}</h3> 
                            <strong style={{color: 'green'}}>R${pdt.preco}</strong>
                        </div>
                        </Card>
                    )
                })}
                <Card id='payment'>
                {/*isRetirada?
                  <Checkbox onChange={e => this.setState({ retirada: !retirada })}>
                    Retirar pedido na loja                                        
                  </Checkbox> : <p></p>
                
                */}
                
                {+pontosU!==0?
                  <Checkbox onChange={e => this.setState({ ponto: !ponto })}>
                    Usar seus {pontosU} pontos nessa Compra                    
                  </Checkbox> : <p>Você Possui 0 Pontos</p>
                
                }
                
               <h5>Produtos: R${this.state.total.toFixed(2)}</h5>
               <h5>Frete: R${frete}</h5>
              <h5>Desconto: R${this.descontaPontos(pontosU,pontosR,pontosD, this.state.ponto)}</h5>
               {/*<h5>Seus Pontos: {pontosU}</h5>
               <h5>essa compra ira render: {((+this.state.total.toFixed(2))/parseFloat(pontosU))*parseFloat(pontosG)}pontos</h5>*/}
              <h2>Total: R${+this.state.total.toFixed(2) + parseFloat(frete) - parseFloat(this.descontaPontos(pontosU,pontosR,pontosD, this.state.ponto))}</h2>
              <TextArea
                placeholder="alguma observação?"
                name="descricao"
                onChange={e => this._handleInputChange(e, model)}
              />
              {isEntrega ? 
              
                <>
                <Checkbox onChange={e => this.setState({ isNew: !isNew })}>
                Pagar Na entrega  
                </Checkbox>
                {isNew ?
                <>
                <Select 
                className="info" 
                defaultValue="Formas de Pagamento"
                required
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "obs_para_pagamento", value } },
                    model
                  )
                }
                >
                {(+painel.dinheiro === 1) ? <Option value="dinheiro" >Dinheiro</Option> : null}
                {(+painel.credito === 1) ? <Option value="credito" >Credito</Option> : null}
                {(+painel.debito === 1) ? <Option value="debito" >Debito</Option> : null}
              </Select> 
                <Button
                onClick={onSuccess}
              >
                Comprar
              </Button> </>:
              <>
              <p></p>
              </>  
              }
                
                </> : null
            
            }

            {isPaypal ? 
            <PaypalExpressBtn env="sandbox" client={client} currency="BRL" total={+this.state.total.toFixed(2) + parseFloat(frete) - +this.descontaPontos(pontosU,pontosR,pontosD, this.state.ponto)} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
            
            : null
          }
              
              
               </Card>
            </Modal>
           </>
        )
    }
}

function mapStateToProps(state) {
  return {
    produtos: state.cart.produtos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    update: data =>
      dispatch({
        type: ActionTypes.CART.SET_FIELDS,
        data
      })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
