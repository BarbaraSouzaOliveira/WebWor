import React from 'react'
import _Page from '../_Page'
import {Input, Icon, InputNumber, Button, Form, notification, Select, } from "antd"
import PropTypes from 'prop-types'
import storePainelService from '../../services/PainelLojaService'
import './styles.css'




var primaryColor = [
    "#CB4335",
    "#7D3C98",
    "#2E86C1",
    "#138D75",
    "#28B463",
    "#D68910",
    "#BA4A00",
    "#FF82AB",
    "#707B7C",
    "#566573"
  ]
  var secundaryColor = [
    "#CD6155",
    "#AF7AC5",
    "#5499C7",
    "#48C9B0",
    "#7DCEA0",
    "#F7DC6F",
    "#F0B27A",
    "#FFAEB9",
    "#CCD1D1",
    "#AEB6BF"
  ]
  


  class Layout extends _Page{
    static propTypes ={
      form: PropTypes.any.isRequired
  }

  service = storePainelService

  state = {
    model: {
    }
}

componetWillMount(){
  this.getModel()

}
componentDidMount() {
  super.componentDidMount()
  
}

handleSubmit = e => {
  e.preventDefault()
  storePainelService.save( this.state.model,"id_painel").then(response => {
    this.update({ model: response.data })
    notification.open({
      message: "Sucesso!",
      description: "Suas alterações foram salvas com sucesso."
    })
  }).catch(e =>{
    notification.open({
      message:"Erro",
      description: "Algo deu errado tente novamente"
    })
    
})
this.props.history.push("/Admin")
}


render (){       
    const { form } = this.props       
    const { TextArea } = Input
    const {model} = this.state
    const {getFieldDecorator} = form    
    const { Option } = Select
          return(
            <body id="bodyLayout">
              <>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                {getFieldDecorator("titulo_loja", {
                rules: [{ message: "campo obrigatorio" }]
              })}
                <h3>Nome da Loja:</h3>
              <Input 
              placeholder="nome da Loja" 
              prefix={<Icon type="shop" />} 
              name="titulo_loja"
              value={model.titulo_loja}
              onChange={e => this._handleInputChange(e, model)}
              />
              </Form.Item>              
              <Form.Item>
              {getFieldDecorator("descricao_loja", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Descrição da Loja:</h3>
              <TextArea 
              placeholder="descrição da Loja" 
              name="descricao_loja"
              value={model.descricao_loja}
              onChange={e => this._handleInputChange(e, model)}
              />
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("img_perfil", {
                rules: [{ message: "campo obrigatorio" }]
              })}
                <h3>Imagem Perfil:</h3>
              <Input 
              type="file"
              placeholder="imagem" 
              name="img_perfil"
              onChange={e => this._handleInputChange(e, model)}
              />
              </Form.Item>
              <Form.Item >
                {getFieldDecorator("img_banner", {
                rules: [{ message: "campo obrigatorio" }]
              })}
                <h3>Imagem de banner:</h3>
              <Input
              type = "file"
              placeholder="imagem" 
              name="img_banner"
              onChange={e => this._handleInputChange(e, model)}
              />
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("tempo_espera", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Tempo de Espera aproximado em minutos:</h3>
              <InputNumber
                name="tempo_espera"
                value={model.tempo_espera}
                formatter={value=> ` ${value} `}
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "tempo_espera", value } },
                    model
                  )
                }
                required
              />
              </Form.Item>

             
              <Form.Item>
              {getFieldDecorator("cor_primaria", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <div>
                <h3> Selecione a cor principal:</h3>
                <Select
                required
                value={model.cor_primaria}
                placeholder="Cor principal"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "cor_primaria", value } },
                    model
                  )
                }
              >
                {primaryColor.map(color => {
                  return <Option style={{ backgroundColor: color }} value={color}>{color}</Option>;
                })}
              </Select>
              </div>
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("cor_secundaria", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <div>
                <h3> Selecione a cor do cardapio:</h3>
                <Select
                required
                value={model.cor_secundaria}
                placeholder="Cor do cardapio"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "cor_secundaria", value } },
                    model
                  )
                }
              >
                {secundaryColor.map(color => {
                  return <Option style={{ backgroundColor: color }} value={color}>{color}</Option>;
                })}
              </Select>
              </div>
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("retirada_loja", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Possui Opção de retirada em Loja?</h3>
              <Select
                required
                value={model.retirada_loja}
                placeholder="Retirada em Loja"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "retirada_loja", value } },
                    model
                  )
                }
              >
                 <Option  value={true}>Sim</Option>
                 <Option  value={false}>Não</Option>
               
              </Select>
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("pagamento_paypal", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Aceitam Pagamento Via PayPal?</h3>
              <Select
                required
                value={model.pagamento_paypal}
                placeholder="Pagamento Via PayPal"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "pagamento_paypal", value } },
                    model
                  )
                }
              >
                 <Option  value={true}>Sim</Option>
                 <Option  value={false}>Não</Option>
               
              </Select>
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("pagamento_entrega", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Aceitam pagamento na entraga (maquina de cartão/dinheiro)?</h3>
              <Select
                required
                value={model.pagamento_entrega}
                placeholder="Pagamento na Entrega"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "pagamento_entrega", value } },
                    model
                  )
                }
              >
                 <Option  value={true}>Sim</Option>
                 <Option  value={false}>Não</Option>
               
              </Select>
              </Form.Item>              
              <Form.Item>
              {getFieldDecorator("credito", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Aceita cartão de credito?</h3>
              <Select
                required
                value={model.credito}
                placeholder="cartao de credito"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "credito", value } },
                    model
                  )
                }
              >
                 <Option  value={true}>Sim</Option>
                 <Option  value={false}>Não</Option>
               
              </Select>
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("debito", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Aceita cartão de debito?</h3>
              <Select
                required
                value={model.debito}
                placeholder="cartao de debito"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "debito", value } },
                    model
                  )
                }
              >
                 <Option  value={true}>Sim</Option>
                 <Option  value={false}>Não</Option>
               
              </Select>
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("dinheiro", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Aceita dinheiro?</h3>
              <Select
                required
                value={model.dinheiro}
                placeholder="dinheiro"
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "dinheiro", value } },
                    model
                  )
                }
              >
                 <Option  value={true}>Sim</Option>
                 <Option  value={false}>Não</Option>
               
              </Select>
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("obs_pagamento", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Observação de pagamento:</h3>
              <TextArea 
              placeholder="bandeiras nao aceitas" 
              name="obs_pagamento"
              value={model.obs_pagamento}
              onChange={e => this._handleInputChange(e, model)}
              />
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("comprado_real", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h2>Pontos Fidelidade</h2>
              <h4 style={{color: "grey"}}>Caso sua loja não aceite pontos fidelidade basta ignora-los</h4>
              <h3>A cada compra no valor de:</h3>
              <InputNumber
                name="comprado_real"
                value={model.comprado_real}
                formatter={value=> `$ ${value} `}
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "comprado_real", value } },
                    model
                  )
                }
                required
              />
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("ponto_gerado", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>A quantidade de pontos gerados é de :</h3>
              <InputNumber
                name="ponto_gerado"
                value={model.ponto_gerado}
                formatter={value=> ` ${value} `}
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "ponto_gerado", value } },
                    model
                  )
                }
                required
              />
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("ponto_real", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>Com o acumulo de pontos na quantidade de: </h3>
              <InputNumber
                name="ponto_real"
                value={model.ponto_real}
                formatter={value=> ` ${value} `}
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "ponto_real", value } },
                    model
                  )
                }
                required
              />
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("cupom_real", {
                rules: [{ message: "campo obrigatorio" }]
              })}
              <h3>É gerado um cupom de desconto no valor de:</h3>
              <InputNumber
                name="cupom_real"
                value={model.cupom_real}
                formatter={value=> `$ ${value} `}
                onChange={value =>
                  this._handleInputChange(
                    { target: { name: "cupom_real", value } },
                    model
                  )
                }
                required
              />
              </Form.Item>
              <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
              </Form>
           
            </>
            </body> 
          )
      }
  }export default Form.create({name: "layoutForm"})(Layout)